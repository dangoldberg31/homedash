// import logo from './logo.svg';
import './App.css';
import {Weather} from './Components/forecast';
import {MTA} from './Components/transit';
import {Panel1} from './Components/panel1';
import React from 'react';
import {useState} from 'react'
// import {MTA2} from './Components/transit2'
// import {Calendar} from './Components/calendar';

function App() {
  const lightStyle = {
    'backgroundColor': 'white',
    'color': 'black'
  }

  const darkStyle = {
    'backgroundColor': 'black',
    'color': 'white'
  }

  const lightButton = {
    'backgroundColor': 'black',
    'border': 'white 3px solid',
    'color': 'white'
  }

  const darkButton = {
    'backgroundColor': 'white',
    'color': 'black',
    'border': 'black 3px solid'
  }

  const [darkMode, setDarkMode] = useState(false);
  const [darkStyling, setDarkStyling] = useState(lightStyle);
  const [darkDesc, setDarkDesc] = useState('Dark Mode')
  const [darkButtonStyle, setDarkButtonStyle] = useState(lightButton);
  const MTAKey = 'QXl3O3OrxU6T9894CHagv9t72mModQkk2zHmK1ad';
  const headingStyle = {
    'backgroundColor': 'black',
    'color': 'white',
    // 'border': '1px solid grey'
  }

  const switchDarkMode = () => {
    if (darkMode === false) {
      setDarkMode(true);
      setDarkStyling(darkStyle);
      setDarkDesc('Light Mode')
      setDarkButtonStyle(darkButton)
    } else if (darkMode === true) {
      setDarkMode(false);
      setDarkStyling(lightStyle);
      setDarkDesc('Dark Mode')
      setDarkButtonStyle(lightButton)
    }
  }

  const convertUnixTime = (num) => {
    let timeArray = [];
    let amPm = 'AM';
    let dt = new Date(num);
    let hr = dt.getHours();
    if (hr > 12) {
        hr -= 12;
        amPm = 'PM'
    } else if (hr === 12) {

      amPm = 'PM'
    }
    let m = dt.getMinutes();
    if (m < 10) {
      m = '0'+m;
    }
    timeArray.push(hr)
    timeArray.push(m)
    timeArray.push(amPm)
    return timeArray;
  }

  const convertUnixDate = (num) => {
    let dateArray = [];
    let dt = new Date(num);
    let month = dt.getMonth() + 1
    let day = dt.getDate();
    let year = dt.getFullYear();
    let weekday = dt.getDay();
    if (weekday === 0) {
      weekday = "Sunday"
    } else if (weekday === 1) {
      weekday = 'Monday';
    } else if (weekday === 2) {
      weekday = 'Tuesday';
    } else if (weekday === 3) {
      weekday = 'Wednesday';
    } else if (weekday === 4) {
      weekday = 'Thursday';
    } else if (weekday === 5) {
      weekday = 'Friday'; 
    } else if (weekday === 6) {
      weekday = 'Saturday';
    }
    dateArray.push(month)
    dateArray.push(day)
    dateArray.push(year)
    dateArray.push(weekday)
    return dateArray;
  }

  return (
    <div className="App" id="App">
      <head>
      </head>
      <header className="App-header">
        <p id="headerrow1" className="appheader"> {convertUnixTime(Date.now())[0]+':'+convertUnixTime(Date.now())[1]+' '+convertUnixTime(Date.now())[2]}</p>
        <div id="darkmode" className="appheader" >
              <button className="appheader" onClick={switchDarkMode} style={darkButtonStyle}>{darkDesc}</button>
        </div>
        <p id="headerrow2" className="appheader">  {convertUnixDate(Date.now())[3]} {convertUnixDate(Date.now())[0]+'/'+convertUnixDate(Date.now())[1]+'/'+convertUnixDate(Date.now())[2]}</p>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
      </header>
      <main>
        <div id="panel1" className="panelContainer" style={darkStyling}>
          <Panel1 convertUnixDate={convertUnixDate} convertUnixTime={convertUnixTime} headingStyle={headingStyle} darkMode={darkMode} darkStyling={darkStyling}/>
        </div>
        <div id="panel2" className="panelContainer" style={darkStyling}>
          <Weather convertUnixTime={convertUnixTime} convertUnixDate={convertUnixDate} headingStyle={headingStyle} />
        </div>
        {/* <div id="testweather" className="sectioncontainer" >
          <TestWeather convertUnixTime={convertUnixTime} convertUnixDate={convertUnixDate} convertUnixDay={convertUnixDay} weatherKey={weatherKey}/>
        </div> */}
        <div id="panel3" className="panelContainer" style={darkStyling}>
          <MTA MTAKey={MTAKey} headingStyle={headingStyle} />
        </div>
      </main>
    </div>
  )
}

export default App;
      
