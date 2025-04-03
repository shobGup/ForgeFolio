import React, { useState, useRef} from 'react';
import "./styles/AddWork.css";

function AddWorkPage1({file, setNextPage, setFile}) {
   const ref = useRef();

   const [workTitle, setWorkTitle] = useState(file.name);
   const [workDate, setWorkDate] = useState(new Date(file.lastModified).toISOString().split("T")[0]);
   const [workDescription, setWorkDescription] = useState("");
   const [errors, setErrors] = useState([false, false, false])


   const handleSubmit = () => {
    if (workTitle.trim() === "") {
        // set the error
        setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[0] = true;
            return newErrors;
        });
        console.log("error!!!");
    }
    else{
        // set the error message
        setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[0] = false;
            return newErrors;
        });
    }
    if (workDate.trim() === "") {
        // set the error message
        setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[1] = true;
            return newErrors;
        });
    }
    else{
        // set the error message
        setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[1] = false;
            return newErrors;
        });
    }
    if (workDescription.trim() === "") {
        // set the error message
        setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[2] = true;
            return newErrors;
        });
    }
    else{
        // set the error message
        setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[2] = false;
            return newErrors;
        });
    }

    if (workTitle.trim() !== "" && workDate.trim() !== "" && workDescription.trim() !== "") {
        document.getElementById("add-work-error-message").hidden = false;
        setNextPage(1);
        
    }
    else{
        document.getElementById("add-work-error-message").hidden = false;
    }



   }

   return (
       <div className='w-100 h-100 m-0 p-0'>
           <div className="add-work-header">
               <div className='add-pages-status'>Page 1/2</div>
               <div className='add-create-a-work'>Upload Work</div>
           </div>

           <div className="add-work-container m-0 p-0">
               <div className="row h-100 w-100 p-0 m-0">
                   {/* Media Container */}
                   <div className="col-auto d-flex flex-column align-items-center media-container p-0 m-0">
                       <img src={URL.createObjectURL(file)} alt="Uploaded Work" className="img-fluid add-work-image mb-2" />
                       <input type="file" ref={ref} hidden></input>
                       <button className="btn btn-secondary" onClick={() => {
                           ref.current.click();
                           ref.current.onchange = (_) => {
                               setFile(ref.current.files[0]);
                           };
                       }}
                       >Replace File</button>
                   </div> 
                   {/* Form Container */}
                   <div className="col h-100 form-container">
                       <form className="w-100 form m-0 p-0">
                           <label className={"form-header m-0 p-0 " + (errors[0] ? "error-header" : "")}>{"Title" + (errors[0] ? " *" : "")}</label>
                           <input className={"form-control mb-3 form-input" + (errors[0] ? " error-input" : "")} onChange={(event) => {setWorkTitle(event.target.value)}} defaultValue={workTitle}></input>

                           <label className={"form-header " + (errors[1] ? "error-header" : "")}>{"Created Date" + (errors[1] ? " *" : "")}</label>
                           <input className={"form-control mb-3 form-input" + (errors[1] ? " error-input" : "")} type="date" defaultValue={workDate} onChange={(event) => {setWorkDate(event.target.value)}}></input>

                           <label className={"form-header " + (errors[2] ? "error-header" : "")}>{"Description" + (errors[2] ? " *": "")}</label>
                           <textarea className={"form-control mb-3 form-textarea" + (errors[2] ? " error-input" : "")} rows={8} defaultValue="Describe your masterpiece..." onChange={(event) => {setWorkDescription(event.target.value)}} ></textarea>
                       </form>
                       <p className="error-message" id="add-work-error-message" hidden>* Please fill out these fields to continue</p>
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