import React, {useState} from "react";
import Tag from "../Tags/Tag";
import "./styles/AddWork.css";

function AddWorkPage2({file, setNextPage}) {

   const [inputValue, setInputValue] = useState("");
   const [tags, setTags] = useState(["Painting", "Digital Art", "Photography", "Nature", "Sculpture", "Mixed Media", "Collage", "Ink Drawing", "Sketches", "Portrait", "Landscape", "Abstract", "Surrealism", "Expressionism", "Pop Art", "Minimalism", "Realism", "Impressionism", "Modern Art", "Cubism", "Calligraphy", "Charcoal Drawing", "Zines", "Fashion Illustration", "Tattoo Design", "Vector Art", "Pixel Art", "3D Modeling", "Mural", "Street Art", "Graffiti", "Stop Motion", "Art Installation", "Performance Art", "Ceramics", "Glass Art", "Woodworking", "Metalwork", "Textile Art", "Graffiti Lettering"]);
   const [filteredTags, setFilteredTags] = useState([]);
   const [selectedTags, setSelectedTags] = useState([]);

   const handleInputChange = (event) => {
       const value = event.target.value;
       setInputValue(value);

       if (value.length > 0) {
           const filtered = tags.filter(tag => tag.toLowerCase().includes(value.toLowerCase()));
           setFilteredTags(filtered);
       } else {
           setFilteredTags([]);
       }
   }

   const handleSuggestionClick = (tag) => {
       if (!selectedTags.includes(tag)) {
           setSelectedTags((prev) => [...prev, tag]);
       }
       setInputValue("");
       setFilteredTags([]);
   }

   const handleCreateNewTag = () => {
       if (inputValue.trim() !== "") {
           setTags((prev) => [...prev, inputValue]);
           setInputValue("");
           setFilteredTags([]);
           setSelectedTags((prev) => [...prev, inputValue]);
       }
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
                       <form className="w-100 form">
                           <label className="form-header">Tags</label>
                           <input className="form-control mb-3 form-input" value={inputValue} onChange={handleInputChange} placeholder="Type to search or create a new tag"></input>
                           {inputValue.trim() !== "" && (
                               <ul className="suggestions-dropdown">
                                   {filteredTags.map((tag, index) => (
                                       <li
                                           key={index}
                                           className="suggestion-item"
                                           onClick={() => handleSuggestionClick(tag)}
                                       >
                                           {tag}
                                       </li>
                                   ))}
                                   {inputValue.trim() !== "" && !filteredTags.includes(inputValue.trim()) && (
                                       <li className="create-new-option"
                                           onClick={handleCreateNewTag}>
                                           Create new "{inputValue.trim()}"
                                       </li>
                                   )}
                               </ul>
                           )}
                       </form>
                       {selectedTags.length > 0 && (
                           <div className="selected-tags-container d-flex flex-wrap">
                               {selectedTags.map((tag, index) => (
                                   <Tag key={index} name={tag} onDelete={true} onClick={() => {
                                        console.log("clicked" + tag);
                                        setSelectedTags((prev) => prev.filter((t) => t !== tag));
                                   }} />
                               ))}
                           </div>
                       )}
                   </div>
               </div>
           </div>

           <div className="add-work-buttons">
               <button className="btn btn-secondary back-button" onClick={() => setNextPage(0)}>Back</button>
               <button className="btn btn-primary next-button" onClick={() => setNextPage(1)}>Upload</button>
           </div>
       </div>
   );
}

export default AddWorkPage2;