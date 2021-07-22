import './marketIndex.css'
import React from "react";
import {useState, useEffect} from 'react';
import { LoadScreen } from './loadScreen';
import { Index } from './marketIndexIndex';

export const Indices = ({indices, convertUnixDate, convertUnixTime}) => {
    const [error, setError] = useState(null);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [isLoaded2, setIsLoaded2] = useState(false);
    const [data, setData] = useState();
    const [dataDay, setDataDay] = useState();

    useEffect(() => {
        let lookupArray = [];
        // let symbolArray = [];
        indices.forEach(i => {
            lookupArray.push(i['symbol']+',');
            // symbolArray.push([i['symbol'], i['name']]);
        });
        fetch(`https://api.twelvedata.com/time_series?symbol=${lookupArray}&interval=1min&apikey=3597a111131b4615a6ffd765ec9b2262`)
        .then(res => res.json())
        .then(
            (result) => {
                if (result['status'] === 'ok') {
                    setData(result);
                    setIsLoaded1(true);
                }
            },
            (error) => {
                setError(error);
                // setIsLoaded1(true);
            }
        )
        fetch(`https://api.twelvedata.com/time_series?symbol=${lookupArray}&interval=1day&apikey=3597a111131b4615a6ffd765ec9b2262`)
        .then(res => res.json())
        .then(
            (result) => {
                if (result['status'] === 'ok') {
                    setDataDay(result);
                    setIsLoaded2(true);
                }
            },
            (error) => {
                setError(error);
                setIsLoaded2(true);
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
    } else if (!isLoaded1 || !isLoaded2) {
        return (
            <div id="loadbox">
                <LoadScreen />
            </div>
        )
    } else {
        return (
            <div id="indexOuterResultContainer">
                {indices.map(i => {
                    return (
                        <div id="indexInnerResultContainer">
                            <Index data={data[i['symbol']]} dataDay={dataDay[i['symbol']]} convertUnixDate={convertUnixDate} convertUnixTime={convertUnixTime}/>
                        </div >
                    )
                })}

            </div>
        );
    }
};