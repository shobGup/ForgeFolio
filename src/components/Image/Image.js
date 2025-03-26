import React from 'react';
import './Image.css'

const Image = ({ work }) => {
    return (
        <div className="works">
            <img src={process.env.PUBLIC_URL + work.imageUrl} alt={work.description} />
            <div>{work.title}</div>
        </div>
    );
};

export default Image;