import './panelPicker.css'
import { useState, useEffect } from 'react';
import {Heading} from './sectionHeader'

export const PanelPicker = ({panel, setPanel}) => {
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

    return (
      <div id="panelPicker">
        <div className="panelbuttoncontainer" id="newsbuttoncontainer" style={newsButton} onClick={newsChooser}>
            <Heading text="News" />
        </div>
        <div className="panelbuttoncontainer" id="marketbuttoncontainer" style={marketButton} onClick={marketChooser}>
            <Heading text="Markets"/>
        </div>
        <div className="panelbuttoncontainer" id="sportsbuttoncontainer" style={sportsButton} onClick={sportsChooser}>
            <Heading text="Sports"/>
        </div>
    </div>
    )
}
