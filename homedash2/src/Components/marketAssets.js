import './marketAsset.css'
import React from "react";
import {useState, useEffect} from 'react';
import { LoadScreen } from './loadScreen';
import {Asset} from './marketAssetsAsset'

export const Assets = ({asset, convertUnixDate}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // const APIKey = 'Axw59AkfZiL8F_ic4mgdsgtbye5r7aN8';
    
    useEffect(() => {
        fetch(`https://api.polygon.io/v2/aggs/ticker/${asset['symbol']}/prev?adjusted=true&apiKey=Axw59AkfZiL8F_ic4mgdsgtbye5r7aN8`)
        .then(res => res.json())
        .then(
            (result) => {
                if (result['resultsCount'] > 0) {
                    setData(result['results'][0]);
                    setIsLoaded(true);
                } else {
                    return;
                }
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
            <div id="assetResultContainer">
                <Asset data={data} convertUnixDate={convertUnixDate} name={asset['name']} shares={asset['shares']}/>
            </div >
        );
    }
};