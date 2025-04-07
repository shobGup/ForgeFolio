import React, {useRef} from 'react';
import './styles/EditToolbar.css';
import { useCanvasStore } from '../../stores/canvasStore';


const EditToolbar = () => {
    const { 
        setPlacingTextbox, 
        canvasRenderAll,
        setPlacingImage,
        setImageUrl,
        resetAllSelection,
        setSelectedObject,
        selectedObject,
        placingTextbox
     } = useCanvasStore();
     
    const isTextboxSelected = selectedObject?.type === 'textbox';
    const ref = useRef();

    return (
        <div className="edit-toolbar">
            <button className="item edit-button edit-delete-button">
                Delete
            </button>
            <button className="item edit-button edit-help-button">
                Help
            </button>
            <button className="item icon print-button">
                <img 
                    src={process.env.PUBLIC_URL + "/images/toolbar_icons/printer_icon.png"} className="icon print-icon" alt="print"/>
            </button>
            <button className="item icon undo-button">
                <img src={process.env.PUBLIC_URL + "/images/toolbar_icons/undo_icon.png"} className="icon undo-icon" alt="undo"/>
            </button>
            <button className="item icon redo-button">
                <img src={process.env.PUBLIC_URL + "/images/toolbar_icons/redo_icon.png"} className="icon redo-icon" alt="redo"/>
            </button>
            <button className="item icon select-button">
                <img 
                    src={process.env.PUBLIC_URL + "/images/toolbar_icons/cursor_icon.png"} 
                    className="icon select-icon" 
                    onClick={ () => {
                        resetAllSelection();
                        setSelectedObject(null);
                    }} 
                    alt="select"
                    style={{backgroundColor: (selectedObject === null) ? "#BBE3FF" : "inherit"}}
                />
            </button>
            <button className="item icon textbox-button">
                <img 
                    src={process.env.PUBLIC_URL + "/images/toolbar_icons/textbox_icon.png"} 
                    className="icon textbox-icon" 
                    onClick={() => {
                        resetAllSelection(); 
                        setPlacingTextbox(true)
                    }}
                    alt="add textbox"
                    style={{backgroundColor: placingTextbox === true ? "#BBE3FF" : "inherit"}}
                />
            </button>
            
            <input type="file" ref={ref} accept='.png,.jpeg,.jpg' hidden/> 
            <button className="item icon image-button" onClick={() => {
                resetAllSelection();
                ref.current.click();
                ref.current.onchange = (_) => {
                    const file = ref.current.files[0];
                    if (file){
                        setImageUrl(URL.createObjectURL(ref.current.files[0]));
                        setPlacingImage(true);
                    }
                    else{
                        console.log("No file selected");
                    }
                };
                }}>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt*/}
                <img src={process.env.PUBLIC_URL + "/images/toolbar_icons/img_icon.svg"} className="icon image-icon" alt="add image"/>
            </button>
            {!isTextboxSelected && (
                <>
                    <div className='vertical-line'/>
                    <button className="item edit-button background-button">
                        Background
                    </button>
                    <div className='vertical-line'/> 
                    <button className="item edit-button layout-button">
                        Layout
                    </button> 
                    <div className='vertical-line'/>
                    <button className="item edit-button edit-tags-button">
                        Edit Tags
                    </button>
                </>
            )}
            {isTextboxSelected && (
                <>
                    <div className='vertical-line'/>
                    <div className='edit-font-size'>
                        <input type="number" min="1" max="100" defaultValue={selectedObject.fontSize} className="item edit-font-input" 
                        onChange={(e) => {
                            const newSize = parseInt(e.target.value);
                            if (!isNaN(newSize) && selectedObject) {
                            selectedObject.set({ fontSize: newSize });
                            canvasRenderAll();
                            }
                        }}/>
                    </div>
                </>
            )}      
        </div>
    );
}

export default EditToolbar;