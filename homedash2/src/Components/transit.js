import './transit.css';
import React from "react";
    // eslint-disable-next-line
import {useState, useEffect} from 'react';
// eslint-disable-next-line
// import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

export const MTA = ({MTAKey}) => {
    // eslint-disable-next-line
    const [error, setError] = useState(null);
    // eslint-disable-next-line
    const [isLoaded, setIsLoaded] = useState(false);
    // eslint-disable-next-line
    const [transitData, setTransitData] = useState();
    // eslint-disable-next-line
    const ACE = 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace';
    // eslint-disable-next-line
    const BD = 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm';
    // eslint-disable-next-line
    const options = {
            // method: "GET",
            // headers: {
            //   "Accept": "application/json",
            //   "x-api-key": {MTAKey}
            // } 
    }
 
    // useEffect(() => {
    //     fetch(`https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace`, options)
    //     .then(resp => resp.on('data'))
    //     .then(resp.on('end')) => {
    //         setTransitData(resp.on)
    //         setIsLoaded(true);
    //         }),
    //         (error) => {
    //             setError(error);
    //             setIsLoaded(true);
    //         })
    //     )
    // }, []);

//     .then(resp => resp.on('data', (chunk) => {
//         console.log("Receiving Data");
//     });
//     resp.on('end', () => {
//         console.log("Finished receiving data");
//     });
// }).on("error", (err) => {
//     console.log("Error: " + err.message)
// });
        // .then(
        //     (result) => {
        //         setTransitData(result)
        //         setIsLoaded(true);
        //     },
        //     (error) => {
        //         setError(error);
        //         setIsLoaded(true);
        //     }
        // )

    
    // if (error) {
    //     return (
    //         <div>
    //             <p>Error: {error.message}</p>
    //         </div>
    //     )
    // } else if (!isLoaded) {
    //     return (
    //         <div>
    //             <p>Loading...</p>
    //         </div>
    //     )
    // } else {
        return (
            <div id="MTA">
                <h1 id="mtaheading" className="sectionheader">MTA Status</h1>
                <div className="container" id="mtaBody" >
                    <p>Placeholder</p>
                    <div className="mtasection">
                        <h3 className="mtasectionheader">Downtown Trains</h3>
                    </div>
                    <div className="mtasection">
                        <h3 className="mtasectionheader">Uptown Trains</h3>
                    </div>
                    <div className="mtasection">
                        <h3 className="mtasectionheader">Downtown Busses</h3>
                    </div>
                    <div className="mtasection">
                        <h3 className="mtasectionheader">Uptown Busses</h3>
                    </div>
                </div>
            </div >
        );
    // }
};