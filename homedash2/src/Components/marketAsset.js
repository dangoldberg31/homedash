import './marketAsset.css'
import React from "react";
import {useState, useEffect} from 'react';
import { LoadScreen } from './loadScreen';

export const Asset = ({asset}) => {
    const [marketName] = useState(asset.name);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [marketClose, setMarketClose] = useState('tbd');
    const [closeDate, setCloseDate] = useState('tbd');
    const [posNeg, setPosNeg] = useState();
    const [percentChange, setPercentChange] = useState();
    const [valueChange, setValueChange] = useState();
    const [styling, setStyling] = useState({
        color : 'black'
    })
    const APIKey = 'Axw59AkfZiL8F_ic4mgdsgtbye5r7aN8';
    const endpoint = `https://api.polygon.io/v2/aggs/ticker/${asset.symbol}/prev?adjusted=true&apiKey=${APIKey}`
    
    const formatDate2 = (num) => {
        let date = new Date(num);
        let month = date.getMonth() + 1
        let day = date.getDate();
        return month+'/'+day;
    }

    const positiveStyle = {
        color: "green"
    }

    const negativeStyle = {
        color: 'red'
    }

    useEffect(() => {
        fetch(`${endpoint}`)
        .then(res => res.json())
        .then(
            (result) => {
                let data = result;
                let pcentChange = (data.results[0].c - data.results[0].o)*100/data.results[0].o;
                let valChange = (data.results[0].c - data.results[0].o) * asset.shares;
                setCloseDate(data.results[0].t);
                setMarketClose(data.results[0].c);
                if (valChange >= 0) {
                    setPosNeg('+')
                    setPercentChange(pcentChange);
                    setValueChange(valChange);
                    setStyling(positiveStyle);
                } else if (valChange < 0) {
                    setPosNeg('-')
                    valChange = valChange * -1;
                    pcentChange = pcentChange * -1;
                    setPercentChange(pcentChange);
                    setValueChange(valChange);
                    setStyling(negativeStyle);
                }
                setIsLoaded(true);
            },
            (error) => {
                setError(error);
                setIsLoaded(true);
            }
        )
    // eslint-disable-next-line
    }, []);


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
        <div id="marketcontainer">
                <div className="asset" id={asset.symbol}>
                    <h2 className="assetheader">{marketName}</h2>
                    <p className="datapoint" id="date">As of {formatDate2(closeDate)}</p>
                    <p className="datapoint"><strong>Close:</strong> ${(marketClose*1).toFixed(2)} <span className="change" style={styling}>({posNeg}{(percentChange*1).toFixed(2)}%)</span></p>
                    <p className="datapoint"><strong>Value:</strong> ${(marketClose*asset.shares).toFixed(2)} <span className="change" style={styling}>(${posNeg}{(valueChange*1).toFixed(2)})</span></p>                   
                </div>
        </div >
    );
    }
};