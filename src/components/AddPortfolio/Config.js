import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Config.css";


function Config({ name }) {
    const [checkbox, setCheckbox] = useState(false);

    return (
        <div className="config-container">
            <button 
                className="config-button"
                onClick={() => setCheckbox(!checkbox)}>
                    {checkbox && (
                        <img src={process.env.PUBLIC_URL + "/images/checkbox-icons/checkbox.png"} className="checkbox"/>
                    )}
            </button>
            <div className="name">
                {name}
            </div>
        </div>
    )
}

export default Config;