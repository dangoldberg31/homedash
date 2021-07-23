import React from 'react';
import './sportsBaseball.css'
import {BaseballGame} from './sportsBaseballGame'
import { useEffect, useState } from 'react';
import { LoadScreen } from './loadScreen';

export const Baseball = () => {
    const [scores, setScores] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const metsTeamId = "135275";
    const gamesList = [0,1,2,3,4];

    useEffect(() => {
        fetch(`https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=${metsTeamId}`)
        .then(response => response.json())
        .then(res => {
            setScores(res.results);
            setIsLoaded(true);
        },
        (error) => {
            setError(error);
            setIsLoaded(true);
        }
        )
    }, [isLoaded]);
    
    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        )
    } else if (!isLoaded) {
        return (
            <div>
                <LoadScreen />
            </div>
        )
    } else {
        return (
            <div id="scoreouter">
                
                {gamesList.map(game => {
                    return (
                        <div 
                            // id={`gamescoreinner`+game} 
                            id={`gamescoreinner`} 
                            className="gamescoreinner">
                            <BaseballGame scores={scores} index={game}/>
                        </div>
                    )
                })}
            </div>
        );
    } 
}



















    // 20210715193355
// https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=4424


// {
//     "idLeague": "4424",
//     "strLeague": "MLB",
//     "strSport": "Baseball",
//     "strLeagueAlternate": "Major League Baseball"
//   }
//   {
//     "name_en": "United States"
//   },

// {
//     "idTeam": "135275",
//     "idSoccerXML": null,
//     "idAPIfootball": "24",
//     "intLoved": "1",
//     "strTeam": "New York Mets",
//     "strTeamShort": "NYM",
//     "strAlternate": "NYM",
//     "intFormedYear": "1962",
//     "strSport": "Baseball",
//     "strLeague": "MLB",
//     "idLeague": "4424",
//     "strLeague2": null,
//     "idLeague2": null,
//     "strLeague3": null,
//     "idLeague3": null,
//     "strLeague4": null,
//     "idLeague4": null,
//     "strLeague5": null,
//     "idLeague5": null,
//     "strLeague6": null,
//     "idLeague6": null,
//     "strLeague7": null,
//     "idLeague7": null,
//     "strDivision": null,
//     "strManager": "Terry Collins",
//     "strStadium": "Citi Field",
//     "strKeywords": "",
//     "strRSS": "http://newyork.mets.mlb.com/partnerxml/gen/news/rss/nym.xml",
//     "strStadiumThumb": "https://www.thesportsdb.com/images/media/team/stadium/veo3bt1550595996.jpg",
//     "strStadiumDescription": "Citi Field is a stadium located in Flushing Meadows–Corona Park in the New York City borough of Queens. Completed in 2009, it is the home baseball park of Major League Baseball's New York Mets. Citi Field was built as a replacement for the formerly adjacent Shea Stadium, which opened in 1964 next to the site of the 1964–1965 World's Fair. Citi Field was designed by Populous (then HOK Sport), and is named after Citigroup, a New York financial services company which purchased the naming rights. The $850 million baseball park was funded with $615 million in public subsides, including the sale of New York City municipal bonds which are to be repaid by the Mets plus interest. The payments will offset property taxes for the lifetime of the park. The Mets are receiving $20 million annually from Citibank in exchange for naming the stadium Citi Field. The entire public cost is being borne by city and state taxpayers in New York.\r\n\r\nThe first game at Citi Field was on March 29, 2009, with a college baseball game between St. John's and Georgetown. The Mets played their first two games at the ballpark on April 3 and April 4, 2009 against the Boston Red Sox as charity exhibition games. The first regular season home game was played on April 13, 2009, against the San Diego Padres. Citi Field hosted the 2013 Major League Baseball All-Star Game. This marked the second time the Mets have hosted the game, the first being 1964, the inaugural season of Shea Stadium.",
//     "strStadiumLocation": "120-01 Roosevelt Avenue Flushing, New York 11368",
//     "intStadiumCapacity": "41922",
//     "strWebsite": "newyork.mets.mlb.com/index.jsp?c_id=nym",
//     "strFacebook": "www.facebook.com/Mets",
//     "strTwitter": "twitter.com/Mets",
//     "strInstagram": "www.instagram.com/mets",
//     "strDescriptionEN": "The New York Mets are an American professional baseball team based in New York City, They play in Flushing, in the borough of Queens. The Mets are a member of the National League East Division of Major League Baseball (MLB). The Mets are one of two Major League clubs based in New York, the other being the New York Yankees.\r\n\r\nOne of baseball's first expansion teams, the Mets were founded in 1962 to replace New York's departed National League teams; the Brooklyn Dodgers and the New York Giants. The Mets' colors are composed of the Dodgers' blue and the Giants' orange, which also comprises the outer two bands of the New York City flag. During the 1962 and 1963 seasons, the Mets played their home games at the Polo Grounds. From 1964 to 2008, the Mets' home ballpark was Shea Stadium. In 2009, they moved into their current ballpark, Citi Field.\r\n\r\nIn their 1962 inaugural season, the Mets posted a record of 40–120, the worst regular season record since Major League Baseball went to a 162-game schedule (two games were canceled). The team never finished better than second to last until the 1969 \"Miracle Mets\" beat the Baltimore Orioles in the 1969 World Series in what is considered one of the biggest upsets in World Series history. Since then, they have played in four additional World Series, including a dramatic run in 1973 that ended in a seven-game loss to the Oakland Athletics, a second championship in 1986 over the Boston Red Sox, a Subway Series loss against their cross-town rivals the New York Yankees in 2000, and a five-game loss to the Kansas City Royals in 2015.\r\n\r\nThe Mets made the playoffs in 2006 when they came within one game of the World Series, losing to the eventual champion St. Louis Cardinals in the NLCS. The Mets missed the playoffs with losses on the last day of the regular season in 2007 and 2008. The Mets made the playoffs in 2015 for the first time in nine years, and won their first National League pennant in 15 years.",
//     "strDescriptionDE": null,
//     "strDescriptionFR": null,
//     "strDescriptionCN": null,
//     "strDescriptionIT": null,
//     "strDescriptionJP": null,
//     "strDescriptionRU": null,
//     "strDescriptionES": null,
//     "strDescriptionPT": null,
//     "strDescriptionSE": null,
//     "strDescriptionNL": null,
//     "strDescriptionHU": null,
//     "strDescriptionNO": null,
//     "strDescriptionIL": null,
//     "strDescriptionPL": null,
//     "strGender": "Male",
//     "strCountry": "United States",
//     "strTeamBadge": "https://www.thesportsdb.com/images/media/team/badge/rxqspq1431540337.png",
//     "strTeamJersey": "https://www.thesportsdb.com/images/media/team/jersey/2019-135275-Jersey.png",
//     "strTeamLogo": "https://www.thesportsdb.com/images/media/team/logo/l4t1g51550595638.png",
//     "strTeamFanart1": "https://www.thesportsdb.com/images/media/team/fanart/ws6cv51551889611.jpg",
//     "strTeamFanart2": "https://www.thesportsdb.com/images/media/team/fanart/fywab31551889629.jpg",
//     "strTeamFanart3": "https://www.thesportsdb.com/images/media/team/fanart/q502gh1551889644.jpg",
//     "strTeamFanart4": "https://www.thesportsdb.com/images/media/team/fanart/x7nb6f1551889658.jpg",
//     "strTeamBanner": "https://www.thesportsdb.com/images/media/team/banner/2epgtx1551889672.jpg",
//     "strYoutube": "",
//     "strLocked": "unlocked"
