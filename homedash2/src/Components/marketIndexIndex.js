import './marketIndexIndex.css'
import React from "react";
import {useState, useEffect} from 'react';
// import { LoadScreen } from './loadScreen';

export const Index = ({data, dataDay, convertUnixDate, convertUnixTime}) => {
    const [styling, setStyling] = useState({
        color : 'black'
    })
    
    const formatTime = () => {
        let date = data['values'][0]['datetime'].split(' ')
        let time = date[1].split(':')
        let hour = time[0];
        let minute = time[1];
        let amPm = '';
        if (hour >= 13) {
            hour -= 12;
            amPm = 'PM'
        } else if (hour < 13) {
            amPm = 'AM'
        }
        return hour+':'+minute+' '+amPm;
    }

    const positiveStyle = {
        color: "green"
    }

    const negativeStyle = {
        color: 'red'
    }

    useEffect(() => {
        if (data['values'][0]['close'] - dataDay['values'][0]['open'] > 0) {
            setStyling(positiveStyle)
        } else if (data['values'][0]['close'] - dataDay['values'][0]['open'] < 0) {
            setStyling(negativeStyle)
        }
        // eslint-disable-next-line
    },[])

    const pcentChange = () => {
        return ((data['values'][0]['close'] - dataDay['values'][0]['open'])*100/dataDay['values'][0]['open']).toFixed(2);
    }

    return (
        <div id="marketcontainer">
            <div className="asset" >
                <h2 className="assetheader">{data['meta']['symbol']}</h2>
                <p className="datapoint" id="date">As of {formatTime()}</p>
                <p className="datapoint">${(Math.round(data['values'][0]['close']))} </p>
                <p className="datapoint" style={styling}>${Math.round(data['values'][0]['close']-dataDay['values'][0]['open'])}</p>
                <p className="datapoint" style={styling}> {pcentChange()}%</p>           
            </div>
        </div >
    );
};