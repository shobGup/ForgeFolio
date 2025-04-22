import React, {useRef, useState, useEffect} from 'react';
import './styles/EditToolbar.css';
import { useCanvasStore } from '../../stores/canvasStore';
import { usePortfoliosStore } from '../../stores/portfoliosStore';


const EditToolbar = () => {
    const FONT_OPTIONS = [
        'Arial',
        'Helvetica',
        'Times New Roman',
        'Georgia',
        'Courier New',
        'Verdana',
        'Trebuchet MS',
        'Comic Sans MS',
        'Impact',
        'Lucida Console',
      ];      

    const { 
        setPlacingTextbox, 
        canvasRenderAll,
        setPlacingImage,
        setImageUrl,
        resetAllSelection,
        setSelectedObject,
        undo,
        redo,
     } = useCanvasStore();

     const placingTextbox = useCanvasStore((state) => state.placingTextbox);

     const selectedObject = useCanvasStore((state) => state.selectedObject);

    const isTextboxSelected = selectedObject?.type === 'textbox';
    const ref = useRef();

    const [fontFamily, setFontFamily] = useState(selectedObject?.fontFamily || 'Arial');
    useEffect(() => {
        if (selectedObject) {
        setFontFamily(selectedObject.fontFamily || 'Arial');
        }
    }, [selectedObject]);

    const [fontSize, setFontSize] = useState(selectedObject?.fontSize || 20);
    useEffect(() => {
        if (selectedObject) {
            setFontSize(selectedObject.fontSize || 20)
        }
    }, [selectedObject])

    return (
        <div className="edit-toolbar">
            <button className="item edit-button edit-delete-button">
                Delete
            </button>
            <button className="item edit-button edit-help-button">
                Help
            </button>
            <button className="item icon print-button">
                <img src={process.env.PUBLIC_URL + "/images/toolbar_icons/printer_icon.png"} className="icon print-icon" alt="print"/>
            </button>
            <button className="item icon undo-button">
                <img src={process.env.PUBLIC_URL + "/images/toolbar_icons/undo_icon.png"} className="icon undo-icon" onClick={undo} alt="undo"/>
            </button>
            <button className="item icon redo-button">
                <img src={process.env.PUBLIC_URL + "/images/toolbar_icons/redo_icon.png"} className="icon redo-icon" onClick={redo} alt="redo"/>
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
                    <button 
                        className="item edit-button background-button"
                        onClick={() => {
                            const color = prompt("Enter background color (e.g., #FFDDDD or red):", "#ffffff");
                            if (color) {
                                usePortfoliosStore.getState().updatePortfolio('backgroundColor', color)
                                useCanvasStore.getState().setBackgroundColor(color);
                            }
                        }}
                        >
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
            {isTextboxSelected && !placingTextbox && (
                <>
                {console.log( 
        selectedObject,
        placingTextbox)}
                    <div className='vertical-line'/>
                    <div className="edit-font-family">
                        <select
                            value={fontFamily}
                            className="item font-dropdown"
                            onChange={(e) => {
                            const newFont = e.target.value;
                            setFontFamily(newFont);
                            if (selectedObject) {
                                selectedObject.set({ fontFamily: newFont });
                                selectedObject.canvas?.requestRenderAll();
                            }
                            }}
                        >
                            {FONT_OPTIONS.map((font) => (
                            <option key={font} value={font} style={{ fontFamily: font }}>
                                {font}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className='edit-font-size'>
                        <input type="number" min="1" max="100" value={fontSize} className="item edit-font-input" 
                        onChange={(e) => {
                            const newSize = parseInt(e.target.value);
                            setFontSize(newSize);
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