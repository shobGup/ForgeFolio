import React from "react";
import "./styles/AddPortfolioPage2.css";

function AddPortfolioPage2({setNextPage, newPortfolio, setNewPortfolio}) {
    const handleInputChange = (field, value) => {
        setNewPortfolio((prevPortfolio) => ({
            ...prevPortfolio,
            [field]: value,
        }));
    };

    return (
        <div>
            <div className="add-portfolio-header">
                <div className='add-pages-status'>Page 2/3</div>
                <div className='add-create-a-portfolio'>Create a Portfolio</div>
            </div>
            <div className="add-portfolio-detail-header">Name</div>
            <input 
                className='add-portfolio-name-input' 
                type='text' 
                placeholder="Name" 
                value={newPortfolio.title} 
                onChange={(e) => handleInputChange("title", e.target.value)}>
            </input>
            <div className="add-portfolio-detail-header">Description</div>
            <textarea 
                className='add-portfolio-description-input' 
                type='text'  
                placeholder="Description"
                value={newPortfolio.description}
                onChange={(e) => handleInputChange("description", e.target.value)}>
            </textarea>
            <div className="add-portfolio-detail-header">Media Count</div>
            <input 
                className="add-portfolio-number-input" 
                type='number' 
                placeholder="0"
                value={newPortfolio.mediaCount}
                onChange={(e) => handleInputChange("mediaCount", e.target.value)}>
            </input>
                
            <div className='add-portfolio-button-bar'>
                <button className='add-next-button' onClick={() => setNextPage(2)}>Next</button>
                <button className='add-back-button' onClick={() => setNextPage(0)}>Back</button>
            </div>
        </div>
    )
}

export default AddPortfolioPage2;