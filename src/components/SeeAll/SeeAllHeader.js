import React from 'react';
import './SeeAllHeader.css';
import { useNavigate } from "react-router-dom";

const SeeAllHeader = () => {

    
    
    const navigate = useNavigate();
    
    const handleBack = (e) => {
        e.preventDefault();
        navigate("/home")
       }
    
    return (
        <div className="works-body" style={{ position: 'relative' }}>
            <div className="works-header-background"></div>
            <div className="works-header-container">
                <form onSubmit={handleBack}>
                    <button className="works-back-button">Back</button>
                </form>
                <div className="works-search-wrapper">
                    <img 
                        src={process.env.PUBLIC_URL + "/images/work_all_symbols/search.svg"} 
                        alt="Search Icon" 
                        className="works-search-icon"
                    />
                    <input className="works-search-bar" type="text" placeholder="Search by name" />
                </div>
                <div className="works-dropdown-wrapper">
                    <select className="works-sort-dropdown">
                        <option value="default">Sort</option>
                        <option value="name">Name</option>
                        <option value="date">Date</option>
                        <option value="tags">Tags</option>
                    </select>
                    <img 
                        src={process.env.PUBLIC_URL + "/images/work_all_symbols/sort_icon.png"} 
                        alt="Sort Icon" 
                        className="works-sort-icon"
                    />
                    <img 
                        src={process.env.PUBLIC_URL + "/images/work_all_symbols/down_icon.png"} 
                        alt="Dropdown Arrow" 
                        className="works-dropdown-arrow"
                    />
                </div>
            </div>
        </div>
    );
};

export default SeeAllHeader;
