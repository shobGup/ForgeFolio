import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/EditHeader.css';

const EditHeader = ({ portfolioName }) => {
    const navigate = useNavigate();
    const savePortfolio = () => {
        // Implement save functionality here
        // add new { title: 'Dreamworks', imageUrl: '/images/portfolio2.png', createdDate: new Date('03/01/2025'), description: 'A portfolio for dreamworks.', tags: ['art', 'paintings', 'cartoon'], link: 30 },
    };

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