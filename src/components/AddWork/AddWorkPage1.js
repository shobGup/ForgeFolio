import React, { useState, useRef} from 'react';
import "./styles/AddWork.css";

function AddWorkPage1({file, setNextPage, setFile, workTitle, workDate, workDescription, setWorkTitle, setWorkDate, setWorkDescription}) {
    const ref = useRef();

    // error handling states
    const [errors, setErrors] = useState([false, false, false]);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // handle next button click
    const handleSubmit = () => {
        const hasErrors = workTitle.trim() === "" || workDate.trim() === "" || workDescription.trim() === "";

        if (hasErrors) {
            setShowErrorMessage(true);
            setErrors([
                workTitle.trim() === "",
                workDate.trim() === "",
                workDescription.trim() === "",
            ]);
        } else {
            setShowErrorMessage(false);
            setNextPage(1);
        }
    };
    
   return (
       <div className='w-100 h-100 m-0 p-0'>
            {/* Header */}
           <div className="add-work-header">
               <div className='add-pages-status'>Page 1/2</div>
               <div className='add-create-a-work'>Upload Work</div>
           </div>

              {/* Describe Work */}
           <div className="add-work-container m-0 p-0">
               <div className="row h-100 w-100 p-0 m-0">
                   {/* Media Container */}
                   <div className="col-auto d-flex flex-column align-items-center media-container p-0 m-0">
                       <img src={URL.createObjectURL(file)} alt="Uploaded Work" className="img-fluid add-work-image mb-2" />
                       <input type="file" ref={ref} accept='.png,.jpeg,.jpg' hidden></input>
                       <button className="btn btn-secondary" onClick={() => {
                           ref.current.click();
                           ref.current.onchange = (_) => {
                                setFile(ref.current.files[0]);
                                setWorkTitle(ref.current.files[0].name);
                                setWorkDate(new Date(ref.current.files[0].lastModified).toISOString().split("T")[0]);
                                setWorkDescription("");
                           };
                       }}
                       >Replace File</button>
                   </div> 
                   {/* Form Container */}
                   <div className="col h-100 form-container">
                       <div className="w-100 form m-0 p-0">
                           <label className={"form-header m-0 p-0 " + (errors[0] ? "error-header" : "")}>{"Title" + (errors[0] ? " *" : "")}</label>
                           <input className={"form-control mb-3 form-input" + (errors[0] ? " error-input" : "")} onChange={(event) => {setWorkTitle(event.target.value)}} value={workTitle}></input>

                           <label className={"form-header " + (errors[1] ? "error-header" : "")}>{"Created Date" + (errors[1] ? " *" : "")}</label>
                           <input className={"form-control mb-3 form-input" + (errors[1] ? " error-input" : "")} type="date" value={workDate} onChange={(event) => {setWorkDate(event.target.value)}}></input>

                           <label className={"form-header " + (errors[2] ? "error-header" : "")}>{"Description" + (errors[2] ? " *": "")}</label>
                           <textarea className={"form-control mb-3 form-textarea" + (errors[2] ? " error-input" : "")} rows={8} placeholder={workDescription.trim() === "" ? "Describe your masterpiece..." : workDescription} onChange={(event) => {
                            setWorkDescription(event.target.value)}} ></textarea>
                       </div>
                       <p className="error-message" id="add-work-error-message" hidden={!showErrorMessage}>* Please fill out these fields to continue</p>
                   </div>
               </div>
           </div>

           <div className="add-work-buttons">
               <button className="btn btn-secondary back-button" onClick={() => setNextPage(0)}>Back</button>
               <button className="btn btn-primary next-button" onClick={handleSubmit}>Next</button>
           </div>
       </div>
   );
}

export default AddWorkPage1;