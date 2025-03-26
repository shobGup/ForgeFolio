import React from 'react';
import './styles/EditHeader.css';


const EditHeader = ({ portfolioName }) => {
    return (
        <div className="edit-header row">
            <img 
                src={process.env.PUBLIC_URL + "/images/Logo_no_Text.png"}
                className='logo'
            />
            <h1 className='portfolio-name'>{portfolioName}</h1>
            <button className='view-button'>View</button>
            <button className='share-button'>Share</button>
        </div>
    );
}

export default EditHeader;