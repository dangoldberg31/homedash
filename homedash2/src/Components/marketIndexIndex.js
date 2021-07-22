import './marketIndexIndex.css'
import React from "react";
import {useState, useEffect} from 'react';
// import { LoadScreen } from './loadScreen';

export const Index = ({data, convertUnixDate}) => {
    const [styling, setStyling] = useState({
        color : 'black'
    })
    
    const formatDate2 = () => {
        let date = convertUnixDate(data['values'][0]['datetime'])
        return date[0]+'/'+date[1];
    }

    const positiveStyle = {
        color: "green"
    }

    const negativeStyle = {
        color: 'red'
    }

    useEffect(() => {
        if (data['values'][0]['close'] - data['values'][0]['open'] > 0) {
            setStyling(positiveStyle)
        } else if (data['values'][0]['close'] - data['values'][0]['open'] < 0) {
            setStyling(negativeStyle)
        }
        // eslint-disable-next-line
    },[])

    const pcentChange = () => {
        return ((data['values'][0]['close'] - data['values'][0]['open'])*100/data['values'][0]['open']).toFixed(2);
    }

    return (
        <div id="marketcontainer">
            <div className="asset" >
                <h2 className="assetheader">{data['meta']['symbol']}</h2>
                <p className="datapoint" id="date">As of {formatDate2()}</p>
                <p className="datapoint">
                    <strong>Close: </strong> 
                    ${(Math.round(data['values'][0]['close']*1))} 
                    <span className="change" style={styling}> ({pcentChange()}%)
                    </span>
                </p>            
            </div>
        </div >
    );
};