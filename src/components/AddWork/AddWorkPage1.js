import React, { useState, useRef} from 'react';
import "./styles/AddWork.css";

function AddWorkPage1({file, setNextPage, setFile}) {


   const ref = useRef();

   const [workTitle, setWorkTitle] = useState("");
   const [workDate, setWorkDate] = useState("");
   const [workDescription, setWorkDescription] = useState("");


   const handleSubmit = () => {
    if (workTitle.trim() !== "") {
        
        return;
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
                           <label className="form-header m-0 p-0">Title</label>
                           <input className="form-control mb-3 form-input" onChange={(event) => {setWorkTitle(event.target.value)}}></input>

                           <label className="form-header">Created Date</label>
                           <input className="form-control mb-3 form-input" type="date"></input>

                           <label className="form-header">Description</label>
                           <textarea className="form-control mb-3 form-textarea" rows={8}></textarea>
                       </form>
                   </div>
               </div>
           </div>

           <div className="add-work-buttons">
               <button className="btn btn-secondary back-button" onClick={() => setNextPage(0)}>Back</button>
               <button className="btn btn-primary next-button" onClick={() => setNextPage(1)}>Next</button>
           </div>
       </div>
   );
}

export default AddWorkPage1;