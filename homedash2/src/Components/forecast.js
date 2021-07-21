import "./forecast.css"
import React from "react";
import {useState, useEffect} from 'react';
import {ForecastDaily} from './forecastDaily';
import {ForecastHourly} from './forecastHourly';
import {ForecastMinutely} from './forecastMinutely';
import { LoadScreen } from "./loadScreen";

export const Weather = ({convertUnixTime, convertUnixDate, convertUnixDay}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [forecast, setForecast] = useState();
    const [image, setImage] = useState(null);
    const [airQuality, setAirQuality] = useState(null);
    const weatherKey = '438933efb34a9a9a24caa81bf3a40b11';
    const x = -73.94357;
    const y = 40.82587;
    const exclude = ''
    const rangeDays = [1,2,3,4,5];
    const rangeHours = [1, 4, 7, 10, 13, 16];
        
    const translateAQI = () => {
        let AQI;
        switch (airQuality['list'][0]['main']['aqi']) {
            case 1:
                AQI = "Good";
                break;
            case 2:
                AQI = "Fair";
                break;
            case 3:
                AQI = "Moderate";
                break;
            case 4:
                AQI = "Poor";
                break;
            case 5:
                AQI = "Very Poor";
                break;
            default:
                AQI = 'No Data'
          }
          return AQI;
    }

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
            fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${y}&lon=${x}&appid=${weatherKey}`)
            .then(resp => resp.json())
            .then(
                (airResult) => {
                    setAirQuality(airResult);
                },
                (error) => {
                    setAirQuality(error);
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
                <LoadScreen />
            </div>
        )
    } else {
    return (
        <div id="container">
            <h1 id="weatherHeading" className="sectionheader">Weather</h1>
            <div id="weatherData">
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
                    <div className="todaydata">
                        <p className="weatherData" id="airquality">Air Quality <br /><span className="data">{translateAQI()}</span></p><br />
                        <p className="weatherData" id="airquality">PM2.5 <br /><span className="data">{Math.round(airQuality['list'][0]['components']['pm2_5'])}</span></p>
                    </div>
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