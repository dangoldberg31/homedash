import "./forecastCurrently.css"
import React from "react";

export const ForecastCurrently = ({convertUnixTime, convertUnixDate, convertUnixDay, forecast, airQuality, capFirst, image}) => {

    return (
        <div id="container">
            <div className="section" id="mainInfo">
                <div id="mainWeather">
                    <p className="currentdata" id="nowtemp">{Math.round(forecast['current']['temp'])} F</p> <br />
                    <img className="currentdata" id="weathericon" src={`http://openweathermap.org/img/wn/${image}@2x.png`} alt={capFirst(forecast['current']['weather'][0]['description'])}/>
                    <p className="currentdata" id="nowdesc">{capFirst(forecast['current']['weather'][0]['description'])}</p>
                    
                </div>
            </div>
            <div id="dataContainer" className="section">
                <div className="todaydata">
                    <p className="weatherData">Wind <br /><span className="data">{Math.round(forecast['current']['wind_speed'])} mph </span></p><br />
                    <p className="weatherData">Gusts <br /> <span className="data">{Math.round(forecast['hourly'][0]['wind_gust'])} mph</span></p>
                </div>
                {/* <div className="todaydata">
                    <p className="weatherData" id="airquality">Air Quality <br /><span className="data">{airQuality[1]}</span></p><br />
                    <p className="weatherData" id="airquality">PM2.5 <br /><span className="data">{airQuality[0]}</span></p>
                </div> */}
                <div className="todaydata" id="todaydatacenter">
                    <p className="weatherDatacenter" id="feelslike">Feels Like <br /><span className="datacenter">{Math.round(forecast['current']['feels_like'])} F</span></p><br />
                    <p className="weatherDatacenter" id="humidity">Humidity: <br /><span className="datacenter">{Math.round(forecast['current']['humidity'])}%</span></p>
                </div>
                <div className="todaydata">
                    <p className="weatherData">High <br /><span className="data">{Math.round(forecast['daily'][0]['temp']['max'])} F</span></p><br />
                    <p className="weatherData">Low <br /><span className="data">{Math.round(forecast['daily'][0]['temp']['min'])} F</span></p>
                </div>
                <div className="todaydata">
                    <p className="weatherData">Sunrise <br /><span className="data">{convertUnixTime(forecast['current']['sunrise']*1000)[0]+':'+convertUnixTime(forecast['current']['sunrise']*1000)[1]+' '+convertUnixTime(forecast['current']['sunrise']*1000)[2]}</span></p><br />
                    <p className="weatherData">Sunset <br /><span className="data">{convertUnixTime(forecast['current']['sunset']*1000)[0]+':'+convertUnixTime(forecast['current']['sunset']*1000)[1]+' '+convertUnixTime(forecast['current']['sunset']*1000)[2]}</span></p>
                </div>
            </div>
        </div>
    )
}