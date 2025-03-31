import React from "react";
// import "./styles/AddPortfolioPage3.css";

function AddPortfolioPage3({setNextPage}) {
    return (
        <div>
            <div className="add-portfolio-header">
                <div className='add-pages-status'>Page 3/3</div>
                <div className='add-create-a-portfolio'>Create a Portfolio</div>
            </div>
            <div className='add-portfolio-button-bar'>
                <button className='add-next-button' onClick={() => setNextPage(2)}>Create</button>
                <button className='add-back-button' onClick={() => setNextPage(1)}>Back</button>
            </div>
        </div>
    )
}

export default AddPortfolioPage3;