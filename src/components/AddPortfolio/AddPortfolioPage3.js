import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AddPortfolioPage3.css";
import Config from "./Config";
import { usePortfoliosStore } from "../../stores/portfoliosStore";

const configurations = ['Headshot', 'Media Descriptions', 'Media Creation Date', 
                        'Resume', 'Contact Information', 'Social Links']

function AddPortfolioPage3({setNextPage, newPortfolio, setNewPortfolio}) {
    const { setCurrentPortfolio, addPortfolio} = usePortfoliosStore.getState();

    const navigate = useNavigate();
    
    const updateConfigurations = (configName) => {
        setNewPortfolio((prevPortfolio) => {
            const isConfigSelected = prevPortfolio.configurations.includes(configName);
            return {
                ...prevPortfolio,
                configurations: isConfigSelected
                    ? prevPortfolio.configurations.filter((config) => config !== configName) 
                    : [...prevPortfolio.configurations, configName],
            };
        });
    };

    return (
        <div>
            {console.log(usePortfoliosStore.getState().portfolios)}
            <div className="add-portfolio-header">
                <div className='add-pages-status'>Page 3/3</div>
                <div className='add-create-a-portfolio'>Create a Portfolio</div>
            </div>
            <div className='portfolio-configurations-container'>
                <div className="portfolio-layout-title">Layout Configurations</div>
                <div className='portfolio-items-container'>{
                    configurations.map((configName) => 
                        <Config 
                            name={configName} 
                            onClick={updateConfigurations}
                            currSelected={newPortfolio.configurations.includes(configName)}>
                        </Config>)}</div>
            </div>
            <div className='add-portfolio-button-bar'>
                <button className='add-next-button' onClick={() => { addPortfolio(newPortfolio); setCurrentPortfolio(newPortfolio); navigate('/edit')}}>Create</button>
                <button className='add-back-button' onClick={() => setNextPage(1)}>Back</button>
            </div>
        </div>
    )
}

export default AddPortfolioPage3;