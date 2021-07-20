
import React from 'react';
import './newsArticle.css';
import { useEffect } from 'react';
// import nytlogo from '../Resources/nyt logo.jpg';
import {Photo} from './newsArticleImage';

export const Article = ({ article, id }) => {
    
    const choosePhotos = () => {
        if (article.multimedia === null) {
            return false
        } else {
            return true;
        }
    }

    useEffect(() => {
        let result = choosePhotos();
        if (result === false) {
            return;
        }
        // eslint-disable-next-line 
    },[])

    if (article.multimedia === null || id>=3) {
        return (
            <div className="nytarticle">
                <div id="storybox">
                    <h1  id="headline"><a href={article.url}>{article.title}</a></h1>
                    <p className="article">{article.abstract}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="nytarticle">
                
                <div class="storybox">
                    <h1 id="headline"><a href={article.url}>{article.title}</a></h1>
                    <Photo article={article} />
                    <p className="article">{article.abstract}</p>
                </div>
                
            </div>
        );
    } 
}