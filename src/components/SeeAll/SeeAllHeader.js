import React from 'react';
import './SeeAllHeader.css';

const SeeAllHeader = ({ work }) => {
    return (
        <div className="header-container">
            <button className="back-button">Back</button>
            <input className="search-bar" type="text" placeholder="Search..." />
            <select className="sort-dropdown">
                <option value="default">Sort</option>
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="popularity">Popularity</option>
            </select>
        </div>
    );
};

export default SeeAllHeader;