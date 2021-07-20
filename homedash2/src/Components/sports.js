import './sports.css'
import React from "react";
// import {useState, useEffect} from 'react';
import {Baseball} from './sportsBaseball';
// import teamsList from './teams'

export const Sports = () => {
    
    return (
        <div id="sports">
            {/* <h1 className="sectionheader">Sports</h1> */}
            <div className="sportscontainer">
                <Baseball />
            </div>
        </div >
    );
};

