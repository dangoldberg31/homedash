import './news.css';
import React from "react";
import {useState, useEffect} from 'react';
import {Article} from './newsArticle'
import { LoadScreen } from './loadScreen';
// import nytlogo from '../Resources/nyt logo.jpg';

export const News = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
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
                  setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setIsLoaded(true);
                }
              )
    // eslint-disable-next-line
    }, []);



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
            <div id="nytimes">
                {/* <h1 className="sectionheader">News</h1> */}
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
        )
    }
};