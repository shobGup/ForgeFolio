import React, { useState } from "react";
import "./styles/Tag.css";



function Tag({ name, count = 0, onDelete = null}) {
    const [selected, setSelected] = useState(false);

    const toggleSelected = () => setSelected(prev => !prev);

    return (
        <div>
            <button 
                className={`tag-box ${selected ? 'selected' : ''}`} 
                onClick={toggleSelected} 
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
                    <div>
                        <button className="delete-button">
                            <img src='/images/tags-icons/delete-tag.png'/>
                        </button>
                    </div>
                )}
            </button>
        </div>
    )
}

export default Tag;