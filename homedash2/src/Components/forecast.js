import "./forecast.css"
import React from "react";
import {useState, useEffect} from 'react';
import {ForecastDaily} from './forecastDaily';
import {ForecastHourly} from './forecastHourly';
import {ForecastMinutely} from './forecastMinutely';
import {LoadScreen} from "./loadScreen";
import {Heading} from './sectionHeader'
import {ForecastCurrently} from "./forecastCurrently";

export const Weather = ({convertUnixTime, convertUnixDate, headingStyle}) => {
    const [error, setError] = useState(null);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [isLoaded2, setIsLoaded2] = useState(false);
    // eslint-disable-next-line
    const [forecast, setForecast] = useState();
    // eslint-disable-next-line
    const [image, setImage] = useState(null);
    // eslint-disable-next-line
    const [airQuality, setAirQuality] = useState();
    const weatherKey = '438933efb34a9a9a24caa81bf3a40b11';
    const x = -73.94357;
    const y = 40.82587;
    const exclude = ''
    const rangeDays = [1,2,3,4,5];
    const rangeHours = [1, 4, 7, 10, 13, 16];
        
    const translateAQI = (data) => {
        let AQI;
        switch (data) {
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
                setIsLoaded1(true);
            },
            (error) => {
                setError(error);
                setIsLoaded1(true);
            }
        )
    }, [x]);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${y}&lon=${x}&appid=${weatherKey}`)
        .then(resp => resp.json())
        .then(
            (airResult) => {
                let pm25 = (airResult['list'][0]['components']['pm2_5']);
                let quality = translateAQI(airResult['list'][0]['main']['aqi']);
                setAirQuality([pm25, quality]);
                setIsLoaded2(true);
            },
            (error) => {
                setAirQuality([error, error]);
                setIsLoaded2(true);
            }
        )
    }, [x]);
    // eslint-disable-next-line
    const capFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        )
    } else if (!isLoaded1 || !isLoaded2) {
        return (
            <div>
                <LoadScreen />
            </div>
        )
    } else {
    return (
        <div id="container">
            <div className="headingOjbectContainer" style={headingStyle}>
                <Heading text="Weather"/>
            </div>
            <ForecastCurrently forecast={forecast} airQuality={airQuality} capFirst={capFirst} image={image} convertUnixTime={convertUnixTime} />
            <div id="minutely" className="section">
                <h2 className="header">Next Hour Rainfall</h2>
                <div className="childcontainer" id="forecastminutely" >
                    <ForecastMinutely forecast={forecast} convertUnixTime={convertUnixTime}/>
                </div>
            </div>
            <div id="hourly" className="section">
                <h2 className="header">Hourly Forecast</h2>
                <div className="childcontainer" id="hourlycontainer">
                    {rangeHours.map(index => {
                        return (
                            <div id="forecasthourly" >
                                <ForecastHourly forecast={forecast} index={index} convertUnixTime={convertUnixTime} capFirst={capFirst}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div id="daily" className="section">
                <h2 className="header">5 Day Forecast</h2>
                <div className="childcontainer" id="dailycontainer">
                    {rangeDays.map(index => {
                        return (
                            <div id="forecastdaily" >
                                <ForecastDaily forecast={forecast} index={index} convertUnixDate={convertUnixDate}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
    }
}