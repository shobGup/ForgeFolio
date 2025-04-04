import React from 'react';
import './SeeAllHeader.css';
import { useNavigate } from "react-router-dom";

const SeeAllHeader = ({ 
    sortState, 
    setSortState, 
    searchQuery, 
    setSearchQuery,
    setSelectedTags,
}) => {
    const navigate = useNavigate();

    const handleBack = (e) => {
        e.preventDefault();
        navigate("/home");
    };

    const handleSortChange = (e) => {
        setSortState(e.target.value);
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
    
        // Split on '#' and take everything after, skipping empty results
        const rawSplits = value.split('#');
        const tags = rawSplits
            .slice(1) // first item is before any '#'
            .map(chunk => chunk.split('#')[0].trim()) // take until next '#' just in case
            .filter(tag => tag.length > 0)
            .map(tag => tag.toLowerCase());
        console.log(tags)
        setSelectedTags(tags);
    };
    
        
    
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
                    <input 
                        className="works-search-bar" 
                        type="text" 
                        placeholder="Search by name or #tags" 
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                
                {/* Sort dropdown */}
                <div className="works-dropdown-wrapper">
                    <img 
                        src={process.env.PUBLIC_URL + "/images/work_all_symbols/down_icon.png"} 
                        alt="down Icon" 
                        className="works-dropdown-arrow"
                    />
                    <select 
                        className="works-sort-dropdown" 
                        value={sortState} 
                        onChange={handleSortChange}
                    >
                        <option value="name">Name</option>
                        <option value="date">Date</option>
                    </select>
                    <img 
                        src={process.env.PUBLIC_URL + "/images/work_all_symbols/sort_icon.png"} 
                        alt="sort Icon" 
                        className="works-sort-icon"
                    />
                </div>
            </div>
        </div>
    );
};

export default SeeAllHeader;