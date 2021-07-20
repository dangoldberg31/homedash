import React from "react";
import './forecastHourly.css'

export const ForecastHourly = ({forecast, index, convertUnixTime, capFirst}) => {

    return (
        <div id="hourlycontainer">
            <div id="weatherData">
                <p className="info" id="hour">{convertUnixTime(forecast['hourly'][index]['dt']*1000)[0]+':'+convertUnixTime(forecast['hourly'][index]['dt']*1000)[1]+''+convertUnixTime(forecast['hourly'][index]['dt']*1000)[2]}</p> 
                <div id="spacingcontainer">
                    <div className="hourspacer"></div>
                    <img id="hourimage" src={`http://openweathermap.org/img/wn/${forecast['hourly'][index]['weather'][0]['icon']}@2x.png`} alt="theweather, silly"/>
                    <div className="hourspacer"></div>
                </div>
                <p className="info" id="hourtemp">{Math.round(forecast['hourly'][index]['temp'])} F</p>
                <p className="info">{capFirst(forecast['hourly'][index]['weather'][0]['description'])}</p>
            </div>
        </div>
    )
}