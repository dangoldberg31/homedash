import React from "react";
import './forecastDaily.css'

export const ForecastDaily = ({forecast, index, convertUnixDate}) => {
    // const [date, setDate] = useState('date')
    // const [day, setDay] = useState('day')
    
    return (
        <div id="container">
            <div id="weatherData">
                <p className="dayforecast" id="dayforecastdate">{convertUnixDate(forecast['daily'][index]['dt']*1000)[3]} {convertUnixDate(forecast['daily'][index]['dt']*1000)[0]+'/'+convertUnixDate(forecast['daily'][index]['dt']*1000)[1]}</p> 
                <div id="spacingcontainer">
                    <div className="dailyspacer"></div>
                    <img id="dailyimage" src={`http://openweathermap.org/img/wn/${forecast['daily'][index]['weather'][0]['icon']}@2x.png`} alt="theweather, silly"/>
                    <div className="dailyspacer"></div>
                </div>
                <p className="dayforecast">High {Math.round(forecast['daily'][index]['temp']['max'])} F</p>
                <p className="dayforecast">Low {Math.round(forecast['daily'][index]['temp']['min'])} F</p>
                <p className="dayforecast">{forecast['daily'][index]['weather'][0]['main']}</p>
            </div>
        </div>
    )
}