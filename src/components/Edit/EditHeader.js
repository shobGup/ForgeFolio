import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/EditHeader.css';

const EditHeader = ({ portfolioName }) => {
    const navigate = useNavigate();

    return (
        <div className="edit-header">
            <img 
                src={process.env.PUBLIC_URL + "/images/Logo_no_Text.png"}
                className='logo'
                onClick={() => navigate('/home')} /* Add on click button */
                style={{ cursor: 'pointer' }}
            />
            <h1 className='portfolio-name'>{portfolioName}</h1>
            <button className='view-button'>View</button>
            <button className='share-button'>Share</button> {/* Add on click button */}
        </div>
    );
}

export default EditHeader;