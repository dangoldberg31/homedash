import './panelPicker.css'
import { useState, useEffect } from 'react';
import {Heading} from './sectionHeader'

export const PanelPicker = ({panel, setPanel}) => {
  const [sportsButton, setSportsButton] = useState({'backgroundColor': 'black'});
  const [marketButton, setMarketButton] = useState({'backgroundColor': 'black'});
  const [newsButton, setNewsButton] = useState({'backgroundColor': 'grey'});
  const [weatherButton, setWeatherButton] = useState({'backgroundColor': 'black'});
  const [transitButton, setTransitButton] = useState({'backgroundColor': 'grey'});

  const weatherChooser = (event) => {
    setPanel('weather')
    setWeatherButton({'backgroundColor': 'grey'});
    setTransitButton({'backgroundColor': 'black'});
    setMarketButton({'backgroundColor': 'black'});
    setNewsButton({'backgroundColor': 'black'});
    setSportsButton({'backgroundColor': 'black'})
  }

  const transitChooser = (event) => {
    setPanel('transit')
    setWeatherButton({'backgroundColor': 'black'});
    setTransitButton({'backgroundColor': 'grey'});
    setMarketButton({'backgroundColor': 'black'});
    setNewsButton({'backgroundColor': 'black'});
    setSportsButton({'backgroundColor': 'black'})
  }

  const marketChooser = (event) => {
    setPanel('market')
    setWeatherButton({'backgroundColor': 'black'});
    setTransitButton({'backgroundColor': 'black'});
    setMarketButton({'backgroundColor': 'grey'});
    setNewsButton({'backgroundColor': 'black'});
    setSportsButton({'backgroundColor': 'black'})
  }

  const sportsChooser = (event) => {
    setPanel('sports')
    setWeatherButton({'backgroundColor': 'black'});
    setTransitButton({'backgroundColor': 'black'});
    setMarketButton({'backgroundColor': 'black'});
    setNewsButton({'backgroundColor': 'black'});
    setSportsButton({'backgroundColor': 'grey'})
  }

  const newsChooser = (event) => {
    setPanel('news')
    setWeatherButton({'backgroundColor': 'black'});
    setTransitButton({'backgroundColor': 'black'});
    setMarketButton({'backgroundColor': 'black'});
    setNewsButton({'backgroundColor': 'grey'});
    setSportsButton({'backgroundColor': 'black'})
  }

  useEffect(() => {

  },[panel])

    return (
      <div id="panelPicker">
        <div className="panelbuttoncontainer" id="weatherbuttoncontainer" style={weatherButton} onClick={weatherChooser}>
            <Heading text="Weather" />
        </div>
        <div className="panelbuttoncontainer" id="transitbuttoncontainer" style={transitButton} onClick={transitChooser}>
            <Heading text="Transit" />
        </div>
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
