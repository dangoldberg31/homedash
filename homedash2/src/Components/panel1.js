import {Sports} from './sports';
import {Market} from './market'
import {News} from './news';
import {Weather} from './forecast'
import {MTA} from './transit'
import './panel1.css'
import { useState, useEffect } from 'react';
import { PanelPicker } from './panelPicker';

export const Panel1 = ({convertUnixDate, convertUnixTime, headingStyle, darkStyling}) => {
  const [panel, setPanel] = useState('news');

  useEffect(() => {

  },[panel])

  if (panel === 'news') {
    return (
      <div id="panelcontainer">
        <PanelPicker panel={panel} setPanel={setPanel} />
        <News darkStyling={darkStyling}/>
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
  } else if (panel === 'weather') {
    return (
      <div id="panelcontainer">
        <PanelPicker panel={panel} setPanel={setPanel}/>
        <Weather convertUnixDate={convertUnixDate} convertUnixTime={convertUnixTime} headingStyle={headingStyle} />
      </div>
    )
  } else if (panel === 'transit') {
    return (
      <div id="panelcontainer">
        <PanelPicker panel={panel} setPanel={setPanel}/>
        <MTA />
      </div>
    )
  }
}
