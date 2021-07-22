import './market.css'
import React from "react";
// import {useState, useEffect} from 'react';
// import { LoadScreen } from './loadScreen';
import {Assets} from './marketAssets';
import {Indices} from './marketIndex';

export const Market = ({convertUnixDate, convertUnixTime}) => {
    // const [data, setData] = useState(null);
    // const [error, setError] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);
    // const APIKey = 'Axw59AkfZiL8F_ic4mgdsgtbye5r7aN8';
    // const APIKey = '3597a111131b4615a6ffd765ec9b2262'


    const assets = [
        {
            name: 'Fidelity S&P Index Fund',
            symbol: "VOO",
            shares: 370,
            type: 'stock'
        },
        {
            name: 'Cocrystal Pharma',
            symbol: "COCP",
            shares: 28,
            type: 'stock'
        }, 
        {
            name: 'Bitcoin',
            symbol: "X:BTCUSD",
            shares: .01,
            type: 'crypto'
        }, 
        {
            name: 'NEO',
            symbol: "NEO",
            shares: 3.424,
            type: 'crypto'
        },
    ]

    const marketIndicesUSA = [
        {
            name: 'S&P 500',
            symbol: "SPX"
        },
        {
            name: 'DJIA',
            symbol: "DJI"
        },
        {
            name: 'Russell 2000',
            symbol: "RUT"
        }        
    ];

    // const marketIndicesInternational = [
    //     {
    //         name: 'FTSE 100',
    //         symbol: "FTSE",
    //         type: 'index'
    //     }, 
    //     {
    //         name: 'Euro Stoxx 50',
    //         symbol: 'STOXX50E',
    //         type: 'index'
    //     }, 
    //     {
    //         name: 'DAX',
    //         symbol: "GDAXI",
    //         type: 'index'
    //     }, 
    //     {
    //         name: 'Nikkei 225',
    //         symbol: "N225",
    //         type: 'index'
    //     }, 
    //     {
    //         name: 'Shanghai Composite',
    //         symbol: "SSEC",
    //         type: 'index'
    //     }, 
    //     {
    //         name: 'MSCI',
    //         symbol: "WORLD:MSCI",
    //         type: 'index'
    //     }, 
    //     {
    //         name: 'Hang Seng',
    //         symbol: "HSI",
    //         type: 'index'
    //     }
    // ]

    // const marketIndicesInternational = ["AIM1","STOXX50E","GDAXI","N225","000001","5825S","HSI"]

        return (
            <div id="marketcontainer">
                {/* <h1 className="sectionheader">Markets</h1> */}
                <h2 className="sectionhead">Markets</h2>
                    <Indices indices={marketIndicesUSA} convertUnixDate={convertUnixDate} convertUnixTime={convertUnixTime}/>
                    {/* <Indices indices={marketIndicesInternational}/> */}
                <h2 className="sectionhead">Assets</h2>
                <div id="assetContainer">
                    {assets.map(i => {
                        return (
                            <div id="innerAssetContainer">
                                <Assets asset={i} convertUnixDate={convertUnixDate}/>
                            </div>
                        )
                    })}
                </div>
            </div >
        );
};

