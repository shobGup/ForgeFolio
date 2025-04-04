import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/EditHeader.css';
import { useCanvasStore } from '../../stores/canvasStore';
import { usePortfoliosStore } from '../../stores/portfoliosStore';

const EditHeader = ({ portfolioName }) => {
    const navigate = useNavigate();

    const updatePortfolioImage = () => {
        const canvas = useCanvasStore.getState().canvas;
        if (!canvas) return;
    
        const newImg = canvas.toDataURL('png');
        const canvasJSON = canvas.toJSON();
        console.log(canvasJSON)
    
        usePortfoliosStore.getState().updatePortfolio('canvas', canvasJSON);
        usePortfoliosStore.getState().updatePortfolio('imageUrl', newImg);
    };

    return (
        <div className="edit-header">
            <img 
                src={process.env.PUBLIC_URL + "/images/Logo_no_Text.png"}
                className='logo'
                onClick={() => {
                    updatePortfolioImage();
                    navigate('/home');
                }} /* Add on click button */
                style={{ cursor: 'pointer' }}
            />
            <h1 className='portfolio-name'>{portfolioName}</h1>
            <button className='view-button'>View</button>
            <button className='share-button'>Share</button> {/* Add on click button */}
        </div>
    );
}

export default EditHeader;