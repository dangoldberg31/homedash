import logo from '../logo2.jpg';
import React from "react";
import './loadScreen.css'

export const LoadScreen = () => {
    
    return (
        <div id="loadcontainer">
            <p id="logoloading">Loading...</p>
            <div id="logocontainer">
                <div className="loadspacer"> </div>
                <img src={logo} className="App-logo" alt="logo" />
                <div className="loadspacer"> </div>
            </div>
        </div>
    )
}