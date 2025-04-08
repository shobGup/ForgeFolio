import React from "react";
import "./styles/AddPortfolioPage1.css";
import Tag from "../Tags/Tag";
import {useTagsStore} from "../../stores/tagsStore.js";

function AddPortfolioPage1({setNextPage, newPortfolio, setNewPortfolio}) {
    const updateTags = (tagName) => {
        setNewPortfolio((prevPortfolio) => {
            const isTagSelected = prevPortfolio.tags.includes(tagName);
            return {
                ...prevPortfolio,
                tags: isTagSelected
                    ? prevPortfolio.tags.filter((tag) => tag !== tagName) 
                    : [...prevPortfolio.tags, tagName],
            };
        });
    };

    const [errors, setErrors] = React.useState(['']);
    const [showErrorMessage, setShowErrorMessage] = React.useState(false);

    const handleSubmit = () => {
        if (newPortfolio.tags.length === 0) {
            setShowErrorMessage(true); 
            setErrors(['Must select at least 1 tag.']);
        } else {
            setShowErrorMessage(false); 
            setErrors(['']);
            setNextPage(1); 
        }
    };

    return (
        <div>
            <div className="add-portfolio-header">
                <div className='add-pages-status'>Page 1/3</div>
                <div className='add-create-a-portfolio'>Create a Portfolio</div>
            </div>
            <div className='add-tags-container'>
                <div className='add-tags-prompt'>Which tags match this portfolio?</div>
                <div className='add-tags-type'>Your tags</div>
                <div className='add-tags-component'>
                    {useTagsStore.getState().getUsedSortedByCount().map(({ name, count }) => (
                        <Tag name={name} count={count} onClick={updateTags} currSelected={newPortfolio.tags.includes(name)}/>
                    ))} 
                </div>
            </div>
            {/* {showErrorMessage && (
                <div className="error-message">
                    Please select at least one tag to proceed.
                </div>
            )} */}
            <div className='add-portfolio-button-bar'>
                {showErrorMessage && (
                    <div className="error-message">
                        {errors[0]}
                    </div>
                )}
                <button className='add-next-button' onClick={handleSubmit}>Next</button>
            </div>
        </div>
    )
}

export default AddPortfolioPage1;