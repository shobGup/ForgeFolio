import React from "react";
import "./styles/AddWork.css";

function AddWorkPage1({file, setNextPage}) {
    return (
        <div className='w-100 h-100 m-0 p-0'>
            {/* copoliot type beat*/}
            <div className="d-flex align-items-center position-relative">
                <h1 className="me-auto">Page 1/2</h1>
                <h1 className="position-absolute start-50 translate-middle-x">Upload Work</h1>
            </div>

            <div className="add-work-container m-0 p-0">
                <div className="row h-100 w-100">
                    <div className="col-4 h-100">
                        <img src={URL.createObjectURL(file)} alt="Uploaded Work" className="img-fluid" /> 
                    </div>  
                    <div className="col-8 h-100">
                    <form>
                            <label>Title</label>
                            <input className="form-control mb-3"></input>

                            <label>Created Date</label>
                            <input className="form-control mb-3"></input>

                            <label>Description</label>
                            <input className="form-control mb-3"></input>
                            
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-secondary me-2" onClick={() => setNextPage(0)}>Back</button>
                                <button className="btn btn-primary" onClick={() => setNextPage(1)}>Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddWorkPage1;