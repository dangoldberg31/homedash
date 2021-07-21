// import logo from './logo.svg';
import {Sports} from './sports';
import {Market} from './market'
import {News} from './news';
import './panel1.css'
import { useState, useEffect } from 'react';
import {Heading} from './sectionHeader'
// import {Calendar} from './Components/calendar';

export const Panel1 = () => {
  const [panel, setPanel] = useState('news');
  const [sportsButton, setSportsButton] = useState({'backgroundColor': 'black'});
  const [marketButton, setMarketButton] = useState({'backgroundColor': 'black'});
  const [newsButton, setNewsButton] = useState({'backgroundColor': 'grey'});

  const marketChooser = (event) => {
    setPanel('market')
    setMarketButton({'backgroundColor': 'grey'});
    setNewsButton({'backgroundColor': 'black'});
    setSportsButton({'backgroundColor': 'black'})
  }

  const sportsChooser = (event) => {
    setPanel('sports')
    setMarketButton({'backgroundColor': 'black'});
    setNewsButton({'backgroundColor': 'black'});
    setSportsButton({'backgroundColor': 'grey'})
  }

  const newsChooser = (event) => {
    setPanel('news')
    setMarketButton({'backgroundColor': 'black'});
    setNewsButton({'backgroundColor': 'grey'});
    setSportsButton({'backgroundColor': 'black'})
  }

  useEffect(() => {

  },[panel])

  if (panel === 'news') {
    return (
      <div id="panelcontainer">
        <div id="buttons">
          <div className="panelbuttoncontainer" id="newsbuttoncontainer" style={newsButton} onClick={newsChooser}>
            <Heading text="News"/>
          </div>
          <div className="panelbuttoncontainer" id="marketbuttoncontainer" style={marketButton} onClick={marketChooser}>
            <Heading text="Markets"/>
          </div>
          <div className="panelbuttoncontainer" id="sportsbuttoncontainer" style={sportsButton} onClick={sportsChooser}>
            <Heading text="Sports"/>
          </div>
        </div>
        <div className="panelcomponent" >
          <News />
        </div>
      </div>
    )
  } else if (panel === 'market') {
    return (
      <div id="panelcontainer">
        <div id="buttons">
          <div className="panelbuttoncontainer" id="newsbuttoncontainer" style={newsButton} onClick={newsChooser}>
            <Heading text="News"/>
          </div>
          <div className="panelbuttoncontainer" id="marketbuttoncontainer" style={marketButton} onClick={marketChooser}>
            <Heading text="Markets"/>
          </div>
          <div className="panelbuttoncontainer" id="sportsbuttoncontainer" style={sportsButton} onClick={sportsChooser}>
            <Heading text="Sports"/>
          </div>
        </div>
        <div className="panelcomponent" >
          <Market />
        </div>
      </div>
    )

  } else if (panel === 'sports') {
    return (
      <div id="panelcontainer">
        <div id="buttons">
          <div className="panelbuttoncontainer" id="newsbuttoncontainer" style={newsButton} onClick={newsChooser}>
            <Heading text="News"/>  
          </div>
          <div className="panelbuttoncontainer" id="marketbuttoncontainer" style={marketButton} onClick={marketChooser}>
            <Heading text="Markets"/>
          </div>
          <div className="panelbuttoncontainer" id="sportsbuttoncontainer" style={sportsButton} onClick={sportsChooser}>
            <Heading text="Sports"/>
          </div>
        </div>
        <div className="panelcomponent">
          <Sports />
        </div>
      </div>
    )
  }
}
