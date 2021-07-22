import {Sports} from './sports';
import {Market} from './market'
import {News} from './news';
import './panel1.css'
import { useState, useEffect } from 'react';
import { PanelPicker } from './panelPicker';

export const Panel1 = ({convertUnixDate}) => {
  const [panel, setPanel] = useState('news');

  useEffect(() => {

  },[panel])

  if (panel === 'news') {
    return (
      <div id="panelcontainer">
        <PanelPicker panel={panel} setPanel={setPanel}/>
        <News />
      </div>
    )
  } else if (panel === 'market') {
    return (
      <div id="panelcontainer">
        <PanelPicker panel={panel} setPanel={setPanel}/>
        <Market convertUnixDate={convertUnixDate}/>
      </div>
    )

  } else if (panel === 'sports') {
    return (
      <div id="panelcontainer">
        <PanelPicker panel={panel} setPanel={setPanel}/>
        <Sports />
      </div>
    )
  }
}
