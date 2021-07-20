import React from 'react';
import './sportsBaseballGame.css'
import { useEffect, useState } from 'react';

export const BaseballGame = ({scores, index}) => {
    const [gameDate, setGameDate] = useState();
    const [result, setResult] = useState();
    const [style, setStyle] = useState();
    const [awayTeam, setAwayTeam] = useState(null);
    const [homeTeam, setHomeTeam] = useState(null);
    const [isLoadedHome, setIsLoadedHome] = useState(false);
    const [isLoadedAway, setIsLoadedAway] = useState(false);
    const [error, setError] = useState(null);
    // const baseballLeagueId = "4424";
    // const metsTeamId = "135275";
    
    const innings = () => {
        let boxFix = scores[index]['strResult'];
        boxFix = boxFix.split('<br>');
        let inningsObj = {
            'awayInnings': boxFix[1],
            'homeInnings': boxFix[5],
            'awayHitsErrors': boxFix[2],
            'homeHitsErrors': boxFix[6]
        }
        return inningsObj
    }

    const winStyle = {
        color: 'green'
    }

    const loseStyle = {
        color: 'red'
    }

    const winLose = () => {
        let metsScore;
        let opponentScore;
        let homeTeamId = scores[index]['idHomeTeam'];
        let awayTeamId = scores[index]['idAwayTeam'];
        if (homeTeamId === '135275') {
            metsScore = Number(scores[index]['intHomeScore']);
            opponentScore = Number(scores[index]['intAwayScore']);
        } else if (awayTeamId === '135275') {
            metsScore = Number(scores[index]['intAwayScore']);
            opponentScore = Number(scores[index]['intHomeScore']);
        }
        if (metsScore > opponentScore) {
            setResult('Win');
            setStyle(winStyle);
        } else if (metsScore < opponentScore) {
            setResult('Lose');
            setStyle(loseStyle);
        } else {
            setResult('not working properly')
        }
    }

    useEffect(() => {
            let scoreDate = scores[index]['dateEvent'].split('-');
            setGameDate(Number(scoreDate[1])+'-'+Number(scoreDate[2]));
            winLose()
            fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${scores[index]['idHomeTeam']}`)
            .then(response => response.json())
            .then(home => {
                setHomeTeam(home['teams'][0])
                setIsLoadedHome(true);
            },
            (error) => {
                setError(error);
                setIsLoadedHome(true);
            }
            )
            fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${scores[index]['idAwayTeam']}`)
            .then(response => response.json())
            .then(away => {
                setAwayTeam(away['teams'][0])
                setIsLoadedAway(true);
            },
            (error) => {
                setError(error);
                setIsLoadedAway(true);
            }
            )
            // eslint-disable-next-line 
    }, [isLoadedAway, isLoadedHome]);
    

    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        )
    } else if (!isLoadedHome || !isLoadedAway) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    } else {
        return (
            <div id="gamescoreouter">
                <p className="gamedata" id="dateofgame">{gameDate}</p>
                <div id="teamscontainer">
                    <div id="awayteamcontainer" className="logocontainer">
                        <img src={awayTeam['strTeamBadge']} alt="Away team logo" id="awaylogo" className="teamlogo"/>
                    </div>
                    <p id="at">at</p>
                    <div id="hometeamcontainer" className="logocontainer">
                        <img src={homeTeam['strTeamBadge']} alt="Home team logo" id="homelogo" className="teamlogo"/>
                    </div>
                </div>
                <p className="finalscore" id="gameresult" style={style}>{result} {scores[index]['intAwayScore']} - {scores[index]['intHomeScore']}</p>
                <div id="moreinfo">
                    <p className="gamedata">{awayTeam['strTeamShort']}: {innings()['awayInnings']}</p>
                    <p className="gamedata">{homeTeam['strTeamShort']}: {innings()['homeInnings']} </p>
                </div>
            </div>
        );
    }
}