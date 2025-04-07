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
                <div className='add-tags-type'>Usused tags</div>
                <div className='add-warning'>WARNING: These tags are not associated with any media yet. 
                    If you select one of those, we will do our best to match to related tags.</div>
                <div className='add-tags-component'>
                    {useTagsStore.getState().getUnusedTags().map(({ name, count }) => (
                        <Tag name={name} count={count} onClick={updateTags} currSelected={newPortfolio.tags.includes(name)}/>
                    ))}
                </div>
            </div>
            <div className='add-portfolio-button-bar'>
                <button className='add-next-button' onClick={() => setNextPage(1)}>Next</button>
            </div>
        </div>
    )
}

export default AddPortfolioPage1;