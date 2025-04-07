import React from "react";
import "./styles/Config.css";

function Config({ name, onClick, currSelected }) {
    return (
        <div className="config-container">
            <button 
                className={`config-button ${currSelected ? "selected" : ""}`}
                onClick={() => onClick(name)} 
            >
                {currSelected && (
                    <img 
                        src={process.env.PUBLIC_URL + "/images/checkbox-icons/checkbox.png"} 
                        className="checkbox" 
                        alt="Selected"
                    />
                )}
            </button>
            <div className="name">
                {name}
            </div>
        </div>
    );
}

export default Config;