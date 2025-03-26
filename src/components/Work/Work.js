import React from 'react';
import './Work.css'

const Work = ({ work }) => {
    return (
        <div className="works">
            <img  src={process.env.PUBLIC_URL + work.imageUrl} alt={work.description} />
            <div>{work.description}</div>
        </div>
    );
};

export default Work;