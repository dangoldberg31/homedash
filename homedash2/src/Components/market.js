import './market.css'
import React from "react";
// import {useState, useEffect} from 'react';
import {Asset} from './marketAsset'
export const Market = () => {

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

    // const marketIndices = [
    //     {
    //         name: 'Fidelity S&P Index Fund',
    //         symbol: "VOO",
    //         shares: 370,
    //         type: 'stock'
    //     },
    //     {
    //         name: 'Cocrystal Pharma',
    //         symbol: "COCP",
    //         shares: 28,
    //         type: 'stock'
    //     }, 
    //     {
    //         name: 'Bitcoin',
    //         symbol: "X:BTCUSD",
    //         shares: .01,
    //         type: 'crypto'
    //     }, 
    //     {
    //         name: 'NEO',
    //         symbol: "NEO",
    //         shares: 3.424,
    //         type: 'crypto'
    //     }
    // ]

    
    return (
        <div id="marketcontainer">
            {/* <h1 className="sectionheader">Markets</h1> */}
            <h2>Market Indeces</h2>
            <div id="outerassetcontainer">
                {/* {assets.map(asset => {
                    return (
                        <div className="innerassetcontainer">
                            <Asset asset={asset}/>
                        </div>
                    )
                })
                } */}
            </div>
            <h2>Assets</h2>
            <div id="outerassetcontainer">
                {assets.map(asset => {
                    return (
                        <div className="innerassetcontainer">
                            <Asset asset={asset}/>
                        </div>
                    )
                })
                }
            </div>

        </div >
    );
};

