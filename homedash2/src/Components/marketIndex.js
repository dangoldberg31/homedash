import './marketIndex.css'
import React from "react";
import {useState, useEffect} from 'react';
import { LoadScreen } from './loadScreen';
import { Index } from './marketIndexIndex';

export const Indices = ({indices, convertUnixDate}) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        let lookupArray = [];
        // let symbolArray = [];
        indices.forEach(i => {
            lookupArray.push(i['symbol']+',');
            // symbolArray.push([i['symbol'], i['name']]);
        });
        
        fetch(`https://api.twelvedata.com/time_series?symbol=${lookupArray}&interval=1day&apikey=3597a111131b4615a6ffd765ec9b2262`)
        .then(res => res.json())
        .then(
            (result) => {
                setData(result);
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
                            <Index data={data[i['symbol']]} convertUnixDate={convertUnixDate} />
                        </div >
                    )
                })}

            </div>
        );
    }
};