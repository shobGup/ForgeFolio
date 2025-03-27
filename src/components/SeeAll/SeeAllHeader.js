import React from 'react';
import './SeeAllHeader.css';

const SeeAllHeader = () => {
    return (
        <div style={{ position: 'relative' }}>
            <div className="header-background"></div>
            <div className="header-container">
                <button className="back-button">Back</button>
                <div className="search-wrapper">
                    <img 
                        src={process.env.PUBLIC_URL + "/images/search.svg"} 
                        alt="Search Icon" 
                        className="search-icon"
                    />
                    <input className="search-bar" type="text" placeholder="Search by name" />
                </div>
                <div className="dropdown-wrapper">
                    <select className="sort-dropdown">
                        <option value="default">Sort</option>
                        <option value="name">Name</option>
                        <option value="date">Date</option>
                        <option value="tags">Tags</option>
                    </select>
                    <img 
                        src={process.env.PUBLIC_URL + "/images/sort_icon.png"} 
                        alt="Sort Icon" 
                        className="sort-icon"
                    />
                    <img 
                        src={process.env.PUBLIC_URL + "/images/down_icon.png"} 
                        alt="Dropdown Arrow" 
                        className="dropdown-arrow"
                    />
                </div>
            </div>
        </div>
    );
};

export default SeeAllHeader;
