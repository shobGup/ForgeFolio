import React from "react";


function AddWork() {
    return (
        <div>
            <h1 className="text-center">Upload Work</h1>

            <div className="container">
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-9">
                        <div className="form-container">
                            <form>
                                <label>Title</label>
                                <input className="form-control mb-3"></input>

                                <label>Created Date</label>
                                <input className="form-control mb-3"></input>

                                <label>Description</label>
                                <input className="form-control mb-3"></input>
                                
                                {/* Login Button */}
                                <button className="btn btn-primary">LOGIN</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddWork;