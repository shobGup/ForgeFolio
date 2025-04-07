import React, { useState } from "react";
import "./styles/Tag.css";



function Tag({ name, count = 0, onDelete = null, onClick=null, currSelected = null}) {
    return (
        <div>
            <button 
                className={`tag-box ${currSelected ? 'selected' : ''}`} 
                onClick={() => onClick && onClick(name)} 
            >
                <div className="tag-name">
                    {name}
                </div>
                {count > 0 && (
                    <div className="count">
                        ({count})
                    </div>
                )}
                { onDelete !== null && (
                    <div className="p-0 m-0 tag-delete-button-container">
                        <button className="delete-button" onClick={onDelete}>
                            <img src={process.env.PUBLIC_URL + '/images/tags-icons/delete-tag.png'}/>
                        </button>
                    </div>
                )}
            </button>
        </div>
    )
}

export default Tag;