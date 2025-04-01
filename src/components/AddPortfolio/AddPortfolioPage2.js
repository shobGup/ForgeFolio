import React from "react";
import "./styles/AddPortfolioPage2.css";

function AddPortfolioPage2({setNextPage}) {
    return (
        <div>
            <div className="add-portfolio-header">
                <div className='add-pages-status'>Page 2/3</div>
                <div className='add-create-a-portfolio'>Create a Portfolio</div>
            </div>
            <div className="add-portfolio-detail-header">Name</div>
            <input className='add-portfolio-name-input' type='text'  placeholder="Name"></input>
            <div className="add-portfolio-detail-header">Description</div>
            <textarea className='add-portfolio-description-input' type='text'  placeholder="Description"></textarea>
            <div className="add-portfolio-detail-header">Media Count</div>
            <input type='number' className="add-portfolio-number-input" placeholder="0"></input>
                
            <div className='add-portfolio-button-bar'>
                <button className='add-next-button' onClick={() => setNextPage(2)}>Next</button>
                <button className='add-back-button' onClick={() => setNextPage(0)}>Back</button>
            </div>
        </div>
    )
}

export default AddPortfolioPage2;