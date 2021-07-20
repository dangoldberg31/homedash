
import React from 'react';
import { useEffect, useState } from 'react';
import './newsArticleImage.css';

export const Photo = ({ article }) => {

    const [photoURL, setPhotoURL] = useState();

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
        setPhotoURL(article.multimedia[0].url);
        // eslint-disable-next-line 
    },[])

    return (
        <div id="articlePhoto">
            <div className="photospacer"></div>
            <img src={photoURL} alt="something that happened"/>
            <div className="photospacer"></div>
        </div>
    );
};
