import React from 'react';
import './HomeHeader.css';

const HomeHeader = ({ work }) => {
    return (
        <div className="header-container">
            <img className="logo" src={process.env.PUBLIC_URL + "/images/Logo_no_Text.png"} alt="ForgeFolio Logo with no Text"/>
            <div className="title">ForgeFolio</div>
            <img className="profile" src={process.env.PUBLIC_URL + "/images/monet-profile.png"} alt="ForgeFolio Logo with no Text"/>
        </div>
    );
};

export default HomeHeader;