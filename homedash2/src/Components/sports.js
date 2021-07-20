import './sports.css'
import React from "react";
// import {useState, useEffect} from 'react';
import {Baseball} from './sportsBaseball';
// import teamsList from './teams'

export const Sports = () => {
    
    return (
        <div id="sports">
            <h2 className="sectionheader">Sports</h2>
            <div className="sportscontainer">
                <Baseball />
            </div>
        </div >
    );
};

