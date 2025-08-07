// 145 St (St. Nicholas) A/B/C/D live departures — single-file server + client
'tuse strict';
const express = require('express');
const fetch = require('node-fetch'); // v2
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const REFRESH_SECONDS = Number(process.env.REFRESH_SECONDS || 15);
const MTA_API_KEY = process.env.MTA_API_KEY;
if (!MTA_API_KEY) {
  console.warn('\n[WARN] Missing MTA_API_KEY. Set it in .env (see .env.example).');
}

// Data sources
const SOCRATA_STATIONS_URL = 'https://data.ny.gov/resource/5f5g-n3cz.json';
// MTA Real-time protobuf feeds by trunk
const FEEDS = {
  ace: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
  bdfm: 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm'
};

// Cache stop ids for 145 St (St. Nicholas) A/B/C/D
let cachedStops = null; // { stopIds: Set<string>, meta: [...] }
let lastStopsFetch = 0;

async function fetchStopsFor145StABCD() {
  const now = Date.now();
  if (cachedStops && (now - lastStopsFetch) < 6 * 60 * 60 * 1000) return cachedStops; // 6h cache

  // Query Socrata for all GTFS stop rows with Stop Name = "145 St"
  const params = new URLSearchParams({
    $select: 'gtfs_stop_id,stop_name,line,daytime_routes,gtfs_latitude,gtfs_longitude',
    stop_name: '145 St',
    $limit: '500'
  });
  const url = `${SOCRATA_STATIONS_URL}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Socrata stations fetch failed: ${res.status}`);
  const rows = await res.json();

  // Keep only Eighth Avenue & Concourse lines (the St. Nicholas complex), not Broadway (1) or Lenox (3)
  const wanted = rows.filter(r => /8th|8th|8 Avenue|Eighth|Concourse/i.test(r.line || ''));

  // Some feeds use stop_id suffixes with N/S for direction. Keep both when present.
  const stopIds = new Set();
  const meta = [];
  for (const r of wanted) {
    if (r.gtfs_stop_id) {
      stopIds.add(r.gtfs_stop_id);
      // also add directional variants if not included (common in subway GTFS)
      if (!/[NS]$/.test(r.gtfs_stop_id)) {
        stopIds.add(r.gtfs_stop_id + 'N');
        stopIds.add(r.gtfs_stop_id + 'S');
      }
      meta.push(r);
    }
  }

  cachedStops = { stopIds, meta };
  lastStopsFetch = now;
  return cachedStops;
}

async function fetchFeed(bufferUrl) {
  const res = await fetch(bufferUrl, {
    headers: { 'x-api-key': MTA_API_KEY }
  });
  if (!res.ok) throw new Error(`MTA feed error ${res.status}`);
  const buffer = await res.buffer();
  return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);
}

function toSeconds(ts) {
  return typeof ts === 'number' ? ts : (ts && ts.low) || 0; // protobuf long fallback
}

function buildArrival(entry, now) {
  const stu = entry.stopTimeUpdate || [];
  const out = [];
  for (const u of stu) {
    const stopId = u.stopId;
    const arr = toSeconds(u.arrival && u.arrival.time);
    const dep = toSeconds(u.departure && u.departure.time);
    const t = arr || dep;
    if (!t) continue;
    const secs = t - now;
    out.push({ stopId, etaSeconds: secs, epoch: t });
  }
  return out;
}

function headsignFromTrip(entity) {
  try {
    const tu = entity.tripUpdate;
    if (tu && tu.trip && tu.trip.routeId) return tu.trip.routeId; // fallback
  } catch {}
  return null;
}

async function getArrivals() {
  const { stopIds } = await fetchStopsFor145StABCD();
  const now = Math.floor(Date.now() / 1000);

  const [ace, bdfm] = await Promise.all([
    fetchFeed(FEEDS.ace).catch(() => null),
    fetchFeed(FEEDS.bdfm).catch(() => null)
  ]);

  const lines = { A: [], B: [], C: [], D: [] };
  for (const feed of [ace, bdfm]) {
    if (!feed) continue;
    for (const e of feed.entity) {
      if (!e.tripUpdate || !e.tripUpdate.trip || !e.tripUpdate.trip.routeId) continue;
      const route = e.tripUpdate.trip.routeId; // 'A','C','B','D' etc
      if (!(route in lines)) continue; // skip other routes
      const arrivals = buildArrival(e.tripUpdate, now)
        .filter(a => a.etaSeconds > -60) // ignore past
        .filter(a => stopIds.has(a.stopId));
      if (arrivals.length === 0) continue;

      // Determine direction from stopId suffix N/S if present
      for (const a of arrivals) {
        const dir = /N$/.test(a.stopId) ? 'N' : /S$/.test(a.stopId) ? 'S' : '?';
        lines[route].push({
          route,
          direction: dir,
          stopId: a.stopId,
          etaSeconds: a.etaSeconds,
          epoch: a.epoch
        });
      }
    }
  }

  // Sort & take next few per route+dir
  const out = {};
  for (const r of Object.keys(lines)) {
    const byDir = { N: [], S: [], '?': [] };
    for (const row of lines[r]) byDir[row.direction].push(row);
    for (const k of Object.keys(byDir)) byDir[k].sort((a,b) => a.etaSeconds - b.etaSeconds);
    out[r] = {
      N: byDir.N.slice(0, 6),
      S: byDir.S.slice(0, 6)
    };
  }

  return { updated: now, refreshSeconds: REFRESH_SECONDS, routes: out };
}

app.get('/api/stops', async (req, res) => {
  try {
    const s = await fetchStopsFor145StABCD();
    res.json({ count: s.stopIds.size, meta: s.meta, ids: Array.from(s.stopIds) });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/arrivals', async (req, res) => {
  try {
    const data = await getArrivals();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Minimal client UI
app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>145 St (St. Nicholas) – A/B/C/D Departures</title>
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; margin: 24px; }
    h1 { margin: 0 0 8px; }
    .muted { color: #666; font-size: 14px; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 16px; }
    .card { border: 1px solid #ddd; border-radius: 12px; padding: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
    .route { font-weight: 700; font-size: 18px; }
    table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    th, td { text-align: left; padding: 6px 4px; border-bottom: 1px solid #eee; }
    .pill { display: inline-block; padding: 2px 8px; border-radius: 999px; background: #efefef; font-weight: 600; }
    .dir { font-variant: all-small-caps; letter-spacing: .04em; }
    .eta { font-weight: 700; }
  </style>
</head>
<body>
  <h1>145 St (St. Nicholas) — A/B/C/D</h1>
  <div class="muted">Live departures · auto-refreshes every <span id="refresh"></span>s · <a href="/api/stops">debug stops</a></div>
  <div id="grid" class="grid"></div>
  <script>
    const grid = document.getElementById('grid');
    const refreshEl = document.getElementById('refresh');
    let REFRESH = ${REFRESH_SECONDS};
    refreshEl.textContent = REFRESH;

    async function load() {
      const res = await fetch('/api/arrivals');
      const json = await res.json();
      REFRESH = json.refreshSeconds || ${REFRESH_SECONDS};
      refreshEl.textContent = REFRESH;
      render(json.routes);
    }

    function mins(sec) { return Math.max(0, Math.round(sec/60)); }

    function card(route, data) {
      const rows = [];
      for (const dir of ['N','S']) {
        const list = data[dir] || [];
        const items = list.map(x => `<tr><td class="dir">${dir === 'N' ? 'Uptown' : 'Downtown'}</td><td class="eta">${mins(x.etaSeconds)} min</td><td class="muted">${x.stopId}</td></tr>`).join('');
        rows.push(`<h4 class="muted">${dir === 'N' ? 'Uptown' : 'Downtown'}</h4><table>${items || '<tr><td class="muted">No trains</td></tr>'}</table>`);
      }
      return `<div class="card"><div class="route"><span class="pill">${route}</span></div>${rows.join('')}</div>`;
    }

    function render(routes) {
      const order = ['A','B','C','D'];
      grid.innerHTML = order.map(r => card(r, routes[r] || {N:[],S:[]})).join('');
    }

    load();
    setInterval(load, REFRESH * 1000);
  </script>
</body>
</html>`);
});

app.listen(PORT, () => console.log(`\n145 St ABCD widget running on http://localhost:${PORT} (refresh ${REFRESH_SECONDS}s)`));
