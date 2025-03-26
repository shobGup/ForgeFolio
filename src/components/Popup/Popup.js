import React from "react";

import "./styles/Popup.css";

{/* https://www.youtube.com/watch?v=i8fAO_zyFAM */}
function Popup(props) {
    if (!props.trigger) return null;
    return (
        <div className="popup">
            <div className="popup-inner">
                <button className="cls-btn" onClick={props.closePopup}>X</button>
                {props.children}
            </div>
        </div>
    );
}

export default Popup