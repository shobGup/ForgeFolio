import React, { useState, useRef} from 'react';

import "./styles/style.css";


const EditWorkPage1 = ({ work, newWork, setNewWork, setShowEditPopup, goToPage }) => {
    console.log(work);
    console.log(newWork);

    let ref = useRef();
    const [errors, setErrors] = useState([false, false, false]);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleSubmit = () => {
        const hasErrors = newWork.title.trim() === "" || isNaN(new Date(newWork.createdDate).getTime()) || newWork.description.trim() === "";

        if (hasErrors) {
            setShowErrorMessage(true);
            setErrors([
                newWork.title.trim() === "",
                isNaN(new Date(newWork.createdDate).getTime()),
                newWork.description.trim() === "",
            ]);
        } else {
            setShowErrorMessage(false);
            goToPage(1);
            // setShowEditPopup(false);
        }
    };

    return (
        <div className='w-100 h-100 m-0 p-0'>
             {/* Header */}
            <div className="add-work-header">
                <div className='add-pages-status'>Page 1/2</div>
                <div className='add-create-a-work'>Edit Work</div>
            </div>
 
               {/* Describe Work */}
            <div className="add-work-container m-0 p-0">
                <div className="row h-100 w-100 p-0 m-0">
                    {/* Media Container */}
                    <div className="col-auto d-flex flex-column align-items-center media-container p-0 m-0">
                        <img src={work.imageUrl.startsWith("/images/") ? process.env.PUBLIC_URL + work.imageUrl : work.imageUrl} alt="Uploaded Work" className="img-fluid add-work-image mb-2" />
                        <input type="file" ref={ref} accept='.png,.jpeg,.jpg' hidden></input>
                        <button className="btn btn-secondary" onClick={() => {
                            ref.current.click();
                            ref.current.onchange = (_) => {
                                setNewWork({
                                    ...newWork,
                                    imageUrl: URL.createObjectURL(ref.current.files[0]),
                                    title: ref.current.files[0].name,
                                    createdDate: new Date(ref.current.files[0].lastModified).toISOString().split("T")[0],
                                    description: "",
                                    tags: [],
                                });
                            };
                        }}
                        >Replace File</button>
                    </div> 
                    {/* Form Container */}
                    <div className="col h-100 form-container">
                        <div className="w-100 form m-0 p-0">
                            <label className={"form-header m-0 p-0 " + (errors[0] ? "error-header" : "")}>{"Title" + (errors[0] ? " *" : "")}</label>
                            <input className={"form-control mb-3 form-input" + (errors[0] ? " error-input" : "")} onChange={(event) => {setNewWork((prev) => ({...prev, title: event.target.value}))}} value={newWork.title}></input>
 
                            <label className={"form-header " + (errors[1] ? "error-header" : "")}>{"Created Date" + (errors[1] ? " *" : "")}</label>
                            <input className={"form-control mb-3 form-input" + (errors[1] ? " error-input" : "")} type="date" value={newWork.createdDate ? new Date(newWork.createdDate).toISOString().split("T")[0] : ""} onChange={(event) => {setNewWork((prev) => ({...prev, createdDate: event.target.value}))}}></input>
 
                            <label className={"form-header " + (errors[2] ? "error-header" : "")}>{"Description" + (errors[2] ? " *": "")}</label>
                            <textarea className={"form-control mb-3 form-textarea" + (errors[2] ? " error-input" : "")} rows={8} placeholder={newWork.description.trim() === "" ? "Describe your masterpiece..." : newWork.description} onChange={(event) => {setNewWork((prev) => ({...prev, description: event.target.value}))}} ></textarea>
                        </div>
                        <p className="error-message" id="add-work-error-message" hidden={!showErrorMessage}>* Please fill out these fields to continue</p>
                    </div>
                </div>
            </div>
 
            <div className="add-work-buttons">
                <button className="btn btn-secondary back-button" onClick={() => setShowEditPopup(false)}>Back</button>
                <button className="btn btn-primary next-button" onClick={handleSubmit}>Next</button>
            </div>
        </div>
    );
}


export default EditWorkPage1;