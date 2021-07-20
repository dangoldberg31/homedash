// import logo from './logo.svg';
import {Sports} from './sports';
import {Market} from './market'
import {News} from './news';
import {LoadScreen} from './loadScreen'
import './panel1.css'
import { useState, useEffect } from 'react';
// import {Calendar} from './Components/calendar';

export const Panel1 = () => {
  const [sportsView, setSportsView] = useState({display: 'none'});
  const [marketView, setMarketView] = useState({display: 'none'});
  const [newsView, setNewsView] = useState({display: 'block'});

  return (
    <div id="panelcontainer">
      <div className="panelcomponent">
        <Sports />
      </div>
      <div className="panelcomponent">
        <News />
      </div>
      <div className="panelcomponent">
        <Market />
      </div>
    </div>
  )
}
