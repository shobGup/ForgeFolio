import React from 'react';
import './styles/EditSidebar.css';


const EditSidebar = ({ works }) => {
    return (
        <div className="sidebar">
            <div className="header-box">
                <h3 className="header-box-title">Other Works</h3>
                <div className="header-search">
                    <img src={process.env.PUBLIC_URL + "/logo192.png"} alt="Search Icon" className="search-icon"/>
                    <input className="header-search-input" type="search" placeholder='Search' /> 
                </div>
                <div className="works-section">
                    
                </div>
            </div>
        </div>
    );
}

export default EditSidebar;