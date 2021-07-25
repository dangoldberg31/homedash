import React from 'react';
import './forecastMinutely.css'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { LoadScreen } from './loadScreen';
import {useState, useEffect} from 'react';

export const ForecastMinutely = ({forecast, convertUnixTime}) => {
  const [values, setValues] = useState(null);
  const [error] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const indexArray = [...Array(60).keys()];
  const [rain, setRain] = useState(true);

  const reducer = (accumulator, currentValue) => {
    return accumulator + currentValue
  }

  useEffect(() => {
    let dataArray = [];
    let rainfall = []
    indexArray.forEach(ind => {
        let precip = Number(forecast['minutely'][ind]['precipitation'])*.039 ;
        let time = convertUnixTime(Number(forecast['minutely'][ind]['dt'])*1000);
        let dataObj = {
          'time': time[1],
          'precip': precip
        }
        dataArray.push(dataObj)
        rainfall.push(precip)
    });
    setValues(dataArray);
    if (rainfall.reduce(reducer) === 0) {
      setRain(false)
    } else {
      setRain(true)
    }
// eslint-disable-next-line
  },[forecast])

  useEffect(() => {
    if (values !== null)
    setIsLoaded(true);
// eslint-disable-next-line
  },[values])

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
  } else if (!rain) {
    return (
        <div className="rain">
              <h4 className="rainstate">Clear</h4>
        </div>
    )
  } else {
    return (
        <div id="hourlyprecipchart">
          <ResponsiveContainer width='95%' height='100%'>
            <BarChart  data={values}>
              <Bar dataKey="precip" fill="#8884d8" />
              <XAxis dataKey="time" />
              <YAxis type="number" domain={[0, .3]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        );
  }
}
    