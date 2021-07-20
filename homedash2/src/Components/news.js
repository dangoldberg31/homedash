import './news.css';
import React from "react";
import {useState, useEffect} from 'react';
import {Article} from './newsArticle'
// import nytlogo from '../Resources/nyt logo.jpg';

export const News = () => {
    const [articles, setArticles] = useState([]);
    const NYTKey = '3dYYpNSA16tVAjuFovcSKRsjJofWbzgu';
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json"
        },
      }
      
    useEffect(() => {
            fetch(` https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${NYTKey}`,options)
            .then(res => res.json())
            .then(
                (result) => {
                  setArticles(result.results);
                }
              )
    // eslint-disable-next-line
    }, []);

    return (
        <div id="nytimes">
            <div id="masthead">
                {/* <div className="spacer"></div>
                <img id="nytlogo" alt="New York Times Logo" src={nytlogo}/>
                <div className="spacer"></div> */}
                <h1>News</h1>
            </div>
            <div id="threecolumncontainer" > 
                <div className="column1" >
                    {articles.map(article => {
                        if (articles.indexOf(article) % 3 === 0) {
                            return(
                                <div className="article" >
                                    <Article article={article} id={articles.indexOf(article)} />
                                </div>
                            );
                    } else {
                        return null
                    }
                })};
                </div>
                <div className="column2" >
                {articles.map(article => {
                        if (articles.indexOf(article) % 3 === 1) {
                            return(
                                <div className="article" >
                                    <Article article={article} id={articles.indexOf(article)} />
                                </div>
                            );
                    } else {
                        return null
                    }
                })};
                </div>
                <div className="column3" >
                    {articles.map(article => {
                        if (articles.indexOf(article)%3 === 2) {
                            return(
                                <div className="article" >
                                    <Article article={article} id={articles.indexOf(article)} />
                                    </div>
                            );
                    } else {
                        return null
                    }
                })};
                </div>
            </div>
            <div id="twocolumncontainer" >
                <div className="column1" >
                    {articles.map(article => {
                        if (articles.indexOf(article) % 2 === 0) {
                            return(
                                <div className="article" >
                                    <Article article={article} id={articles.indexOf(article)} />
                                </div>
                            );
                    } else {
                        return null
                    }
                })};
                </div>
                <div className="column2" >
                {articles.map(article => {
                        if (articles.indexOf(article) % 2 === 1) {
                            return(
                                <div className="article" >
                                    <Article article={article} id={articles.indexOf(article)} />
                                </div>
                            );
                    } else {
                        return null
                    }
                })};
                </div>
            </div>
            <div id="onecolumncontainer" >
                <div className="column1" >
                    {articles.map(article => {
                        return(
                            <div className="article" >
                                <Article article={article} id={articles.indexOf(article)} />
                            </div>
                        );
                })};
                </div>
            </div>
        </div>
    )
};