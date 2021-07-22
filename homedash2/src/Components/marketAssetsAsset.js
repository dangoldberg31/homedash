import './marketAssetAsset.css'
import React from "react";
import {useState, useEffect} from 'react';
// import { LoadScreen } from './loadScreen';

export const Asset = ({data, convertUnixDate, shares, name}) => {
    const [styling, setStyling] = useState({
        color : 'black'
    })
    
    // const formatDate2 = (num) => {
    //     let date = new Date(num);
    //     let month = date.getMonth() + 1
    //     let day = date.getDate();
    //     return month+'/'+day;
    // }

    const formatDate2 = (num) => {
        let date = convertUnixDate(data['t'])
        return date[0]+'/'+date[1];
    }

    const positiveStyle = {
        color: "green"
    }

    const negativeStyle = {
        color: 'red'
    }

    useEffect(() => {
        if (data['c'] - data['o'] > 0) {
            setStyling(positiveStyle)
        } else if (data['c'] - data['o'] < 0) {
            setStyling(negativeStyle)
        }
        // eslint-disable-next-line
    },[])

    const pcentChange = () => {
        return ((data['c'] - data['o'])*100/data['o']).toFixed(2);
    }

    const valueChange = () => {
       return ((data['c'] - data['o']) * shares).toFixed(2);
    }

    return (
        <div id="marketcontainer">
            <div className="asset" >
                <h2 className="assetheader">{name}</h2>
                <p className="datapoint" id="date">As of {formatDate2()}</p>
                <p className="datapoint">
                    <strong>Close: </strong> 
                    ${(data['c']*1).toFixed(2)} 
                    <span className="change" style={styling}> ({pcentChange()}%)
                    </span>
                </p>
                <p className="datapoint">
                    <strong> Value: </strong> 
                        ${(data['c']*shares).toFixed(2)} 
                        <span className="change" style={styling}> (${valueChange()})
                            </span>
                            </p>                    
            </div>
        </div >
    );
};