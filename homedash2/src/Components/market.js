import './market.css'
import React from "react";
// import axios from 'axios';
// import {useState, useEffect} from 'react';
import {Asset} from './marketAsset'
export const Market = () => {
    const marketKey = 'Axw59AkfZiL8F_ic4mgdsgtbye5r7aN8';
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
    //     {
    //         name: 'Principalthing',
    //         symbol: "MUTF: LTFPX",
    //         shares: 3.424,
    //         type: 'stock'
    // }
    ]

    
    return (
        <div id="marketcontainer">
            <h1 className="sectionheader">Markets & Holdings</h1>
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

