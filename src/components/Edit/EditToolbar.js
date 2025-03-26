import React from 'react';
import './styles/EditToolbar.css';


const EditToolbar = () => {
    return (
        <div className="edit-toolbar">
            <div className="buttons">
                <button className="item button delete-button">
                    Delete
                </button>
                <button className="item button help-button">
                    Help
                </button>
            </div>
            <div className="icons">
                <button className="item icon print-button">
                    <img src={process.env.PUBLIC_URL + "/logo192.png"} className="icon print-icon" alt="print"/>
                </button>
                <button className="item icon undo-button">
                    <img src={process.env.PUBLIC_URL + "/logo192.png"} className="icon undo-icon" alt="undo"/>
                </button>
                <button className="item icon redo-button">
                    <img src={process.env.PUBLIC_URL + "/logo192.png"} className="icon redo-icon" alt="redo"/>
                </button>
                <button className="item icon select-button">
                    <img src={process.env.PUBLIC_URL + "/logo192.png"} className="icon select-icon" alt="select"/>
                </button>
                <button className="item icon textbox-button">
                    <img src={process.env.PUBLIC_URL + "/logo192.png"} className="icon textbox-icon" alt="add textbox"/>
                </button>
                <button className="item icon image-button">
                    {/* eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
                    <img src={process.env.PUBLIC_URL + "/logo192.png"} className="icon image-icon" alt="add image"/>
                </button>
            </div>
            <div className='vertical-line'/>
            <button className="item button background-button">
                Background
            </button>
            <div className='vertical-line'/> 
            <button className="item button layout-button">
                Layout
            </button> 
            <div className='vertical-line'/>
            <button className="item button edit-tags-button">
                Edit Tags
            </button>         
        </div>
    );
}

export default EditToolbar;