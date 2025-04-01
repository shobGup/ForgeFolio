import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AddPortfolioPage3.css";
import Config from "./Config";

const configurations = ['Headshot', 'Media Descriptions', 'Media Creation Date', 
                        'Resume', 'Contact Information', 'Social Links']

function AddPortfolioPage3({setNextPage}) {
    const navigate = useNavigate();
    return (
        <div>
            <div className="add-portfolio-header">
                <div className='add-pages-status'>Page 3/3</div>
                <div className='add-create-a-portfolio'>Create a Portfolio</div>
            </div>
            <div className='portfolio-configurations-container'>
                <div className="portfolio-layout-title">Layout Configurations</div>
                <div className='portfolio-items-container'>{configurations.map((configName) => <Config name={configName}></Config>)}</div>
            </div>
            <div className='add-portfolio-button-bar'>
                <button className='add-next-button' onClick={() => {navigate('/edit')}}>Create</button>
                <button className='add-back-button' onClick={() => setNextPage(1)}>Back</button>
            </div>
        </div>
    )
}

export default AddPortfolioPage3;