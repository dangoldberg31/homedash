import "./forecast.css"
import React from "react";
import {useState, useEffect} from 'react';
import {ForecastDaily} from './forecastDaily';
import {ForecastHourly} from './forecastHourly';
import {ForecastMinutely} from './forecastMinutely';

export const Weather = ({convertUnixTime, convertUnixDate, convertUnixDay, weatherKey}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [forecast, setForecast] = useState();
    const [image, setImage] = useState(null);
    const x = -73.94357;
    const y = 40.82587;
    const exclude = ''
    const rangeDays = [1,2,3,4,5];
    const rangeHours = [1, 4, 7, 10, 13, 16];
        
    useEffect(() => {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${y}&lon=${x}&exclude=${exclude}&units=imperial&appid=${weatherKey}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setForecast(result);
                    setImage(result['current']['weather'][0]['icon'])
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
            )
    }, [weatherKey, x]);
    
    const capFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        )
    } else if (!isLoaded) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    } else {
    return (
        <div id="container">
            <h1 id="weatherHeading">Weather</h1>
            <div id="weatherData">
                <div className="section" id="mainInfo">
                    <div id="mainWeather">
                        <p className="currentdata" id="nowtemp">{Math.round(forecast['current']['temp'])} F</p> <br />
                        <img className="currentdata" id="weathericon" src={`http://openweathermap.org/img/wn/${image}@2x.png`} alt={capFirst(forecast['current']['weather'][0]['description'])}/>
                        <p className="currentdata" id="nowdesc">{capFirst(forecast['current']['weather'][0]['description'])}</p>
                        
                    </div>
                </div>
                <div id="dataContainer" className="section">
                        <p className="todaydata" id="feelslikedata">Feels Like: <br /><span className="data">{Math.round(forecast['current']['feels_like'])} F</span></p>
                        <div className="todaydata">
                            <p className="weatherData">Wind: <br /><span className="data">{Math.round(forecast['current']['wind_speed'])} mph </span></p><br />
                            <p className="weatherData">Gusts: <br /> <span className="data">{Math.round(forecast['current']['wind_gust'])} mph</span></p>
                        </div>
                        <p className="todaydata" id="feelslikedata">Humidity: <br /><span className="data">{Math.round(forecast['current']['humidity'])}%</span></p>
                        <div className="todaydata">
                            <p className="weatherData">High: <br /><span className="data">{Math.round(forecast['daily'][0]['temp']['max'])} F</span></p><br />
                            <p className="weatherData">Low: <br /><span className="data">{Math.round(forecast['daily'][0]['temp']['min'])} F</span></p>
                        </div>
                        <div className="todaydata">
                            <p className="weatherData">Sunrise: <br /><span className="data">{convertUnixTime(forecast['current']['sunrise']*1000)[0]+':'+convertUnixTime(forecast['current']['sunrise']*1000)[1]+' '+convertUnixTime(forecast['current']['sunrise']*1000)[2]}</span></p><br />
                            <p className="weatherData">Sunset: <br /><span className="data">{convertUnixTime(forecast['current']['sunset']*1000)[0]+':'+convertUnixTime(forecast['current']['sunset']*1000)[1]+' '+convertUnixTime(forecast['current']['sunset']*1000)[2]}</span></p>
                        </div>
                </div>
                <div id="nexthour" className="section">
                    <h2 className="header">Next Hour Rainfall</h2>
                    <div id="nexthourforecast" className="elementContainer">
                        <ForecastMinutely forecast={forecast} convertUnixTime={convertUnixTime}/>
                    </div>
                </div>
                <div id="hourly" className="section">
                    <h2 className="header">Hourly Forecast</h2>
                    <div className="childcontainer" id="hourlycontainer">
                        {rangeHours.map(index => {
                            return (
                                <div id="forecasthour" className="elementContainer">
                                    <ForecastHourly forecast={forecast} index={index} convertUnixTime={convertUnixTime} capFirst={capFirst}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div id="fiveday" className="section">
                    <h2 className="header">5 Day Forecast</h2>
                    <div className="childcontainer" id="dailycontainer">
                        {rangeDays.map(index => {
                            return (
                                <div id="forecastday" className="elementContainer">
                                    <ForecastDaily forecast={forecast} index={index} convertUnixDate={convertUnixDate}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
    }
}