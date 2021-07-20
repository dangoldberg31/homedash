// import logo from './logo.svg';
import './App.css';
import {Weather} from './Components/forecast';
import {MTA} from './Components/transit';
import {Panel1} from './Components/panel1'
// import {Calendar} from './Components/calendar';

function App() {
  const MTAKey = 'QXl3O3OrxU6T9894CHagv9t72mModQkk2zHmK1ad';
  const weatherKey = '438933efb34a9a9a24caa81bf3a40b11';

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
        <p id="headerrow2" className="appheader">  {convertUnixDate(Date.now())[3]} {convertUnixDate(Date.now())[0]+'/'+convertUnixDate(Date.now())[1]+'/'+convertUnixDate(Date.now())[2]}</p>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
      </header>
      <main>
        <div id="panel1" className="sectioncontainer">
          <Panel1 />
        </div>
        <div id="panel2" className="sectioncontainer" >
          <Weather convertUnixTime={convertUnixTime} convertUnixDate={convertUnixDate} weatherKey={weatherKey}/>
        </div>
        {/* <div id="testweather" className="sectioncontainer" >
          <TestWeather convertUnixTime={convertUnixTime} convertUnixDate={convertUnixDate} convertUnixDay={convertUnixDay} weatherKey={weatherKey}/>
        </div> */}
        <div id="panel3" className="sectioncontainer" >
          <MTA MTAKey={MTAKey}/>
        </div>
      </main>
    </div>
  )
}

export default App;
      
