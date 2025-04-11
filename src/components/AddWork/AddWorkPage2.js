import React, {useState} from "react";
import Tag from "../Tags/Tag";
import "./styles/AddWork.css";

import { useWorksStore } from "../../stores/worksStore";
import { useTagsStore } from "../../stores/tagsStore";

const AddWorkPage2 = ({file, setNextPage, workTitle, workDate, workDescription, workTags, setWorkTags, setAddWorkPopup}) => {

    const worksStore = useWorksStore();
    const tagsStore = useTagsStore();
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // State to manage the input value and filtered tags
    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState(["Painting", "Digital Art", "Photography", "Nature", "Sculpture", "Mixed Media", "Collage", "Ink Drawing", "Sketches", "Portrait", "Landscape", "Abstract", "Surrealism", "Expressionism", "Pop Art", "Minimalism", "Realism", "Impressionism", "Modern Art", "Cubism", "Calligraphy", "Charcoal Drawing", "Zines", "Fashion Illustration", "Tattoo Design", "Vector Art", "Pixel Art", "3D Modeling", "Mural", "Street Art", "Graffiti", "Stop Motion", "Art Installation", "Performance Art", "Ceramics", "Glass Art", "Woodworking", "Metalwork", "Textile Art", "Graffiti Lettering"]);
    const [filteredTags, setFilteredTags] = useState([]);

    // Function to handle input change
    const handleInputChange = (event) => {
        const value = event?.target?.value || "";
        setInputValue(value);

        if (value.trim().length > 0) {
            const filtered = tags.filter(tag => tag.toLowerCase().includes(value.toLowerCase()));
            setFilteredTags(filtered);
        } else {
            setFilteredTags([]);
        }
    }

    // function to handle suggestion click
    const handleSuggestionClick = (tag) => {
        if (!workTags.includes(tag)) {
            setWorkTags((prev) => [...prev, tag]);
        }
        setShowErrorMessage(false);
        setInputValue("");
        setFilteredTags([]);
    }

    // function to handle creating a new tag
    const handleCreateNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags((prev) => [...prev, inputValue]);
            setInputValue("");
            setFilteredTags([]);
            setWorkTags((prev) => [...prev, inputValue]);
            tagsStore.updateTagCount(inputValue);
            setShowErrorMessage(false);
        }
    }

    // function to handle upload
    const handleUpload = () => {
        if (workTags.length === 0){
            setShowErrorMessage(true);
            return;
        }
        const newWork = {
            title: workTitle,
            imageUrl: URL.createObjectURL(file),
            createdDate: new Date(workDate),
            description: workDescription,
            tags: workTags
        }
        worksStore.addWork(newWork);
        setAddWorkPopup(false); 
    }


    return (
        <div className='w-100 h-100 m-0 p-0'>
            <div className="add-work-header">
                <div className='add-pages-status'>Page 2/2</div>
                <div className='add-create-a-work'>Upload Work</div>
            </div>

            <div className="add-work-container m-0 p-0">
                <div className="row h-100 w-100 p-0 m-0">
                    {/* Media Container */}
                    <div className="col-auto d-flex flex-column align-items-center media-container p-0 m-0">
                        <img src={URL.createObjectURL(file)} alt="Uploaded Work" className="img-fluid add-work-image mb-2" />
                    </div> 
                    {/* Form Container */}
                    <div className="col h-100 form-container">
                        <div className="w-100 form">
                            <label className={"form-header" + (showErrorMessage ? " error-header" : "")}>{"Tags" + (showErrorMessage ? " *" : "")}</label>
                            <input className={"form-control mb-3 form-input" + (showErrorMessage ? " error-input" : "")} value={inputValue} onChange={handleInputChange} placeholder="Type to search or create a new tag"></input>
                            {inputValue.trim() !== "" && (
                                <ul className="suggestions-dropdown">
                                    {filteredTags.map((tag, index) => (
                                        <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(tag)}>{tag}</li>
                                    ))}
                                    {inputValue.trim() !== "" && !filteredTags.includes(inputValue.trim()) && (
                                        <li className="create-new-option" onClick={handleCreateNewTag}>{"Create new tag " + "\"" + inputValue.trim() + "\""}</li>
                                    )}
                                </ul>
                            )}
                            <p className="error-message" id="add-work-error-message" hidden={!showErrorMessage}>* Please add at least one tag to your work</p>
                        </div>
                        {workTags.length > 0 && (
                            <div className="selected-tags-container d-flex flex-wrap">
                                {workTags.map((tag, index) => (
                                    <Tag key={index} name={tag} onDelete={() => {setWorkTags((prevTags) => prevTags.filter((t) => t !== tag))}} />
                                ))}
                            </div>
                        )}
                        
                    </div>
                    
                </div>
                
            </div>

            <div className="add-work-buttons">
                <button className="btn btn-secondary back-button" onClick={() => setNextPage(0)}>Back</button>
                <button className="btn btn-primary next-button" onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
}

export default AddWorkPage2;