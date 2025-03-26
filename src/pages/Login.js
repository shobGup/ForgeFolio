import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";
import Popup from "../components/Popup/Popup";
import AddWork from "../components/AddWork/AddWork";

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/home")
    }


    const [buttonPopup, setButtonPopup] = useState(true);


    return (
        <div className="container">
            {/* Top Row */}
            <div className="row mb-5">
                <div className="col text-center">
                    <h1 className="mx-auto">ForgeFolio</h1>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="form-container">
                        <h1 className="text-center">Login</h1>

                        <form onSubmit={handleSubmit}>
                            <label>Username</label>
                            <input className="form-control mb-3"></input>

                            <label>Password</label>
                            <input className="form-control mb-3"></input>
                            
                            {/* Checkbox */}
                            <div className="form-check mb-3">
                                <input className="form-check-input" type="checkbox" value="" id="remember-me"></input>
                                <label className="form-check-label" for="remember-me">Remember Me?</label>
                            </div>
                            
                            {/* Login Button */}
                            <button className="btn btn-primary w-100">LOGIN</button>
                        </form>

                        <a href="/" className="d-block text-center mt-5">Forgot password?</a>
                            <p className="d-block text-center">Need an account? <a href="/">SIGN UP</a></p>
                    </div>
                </div>
            </div>
            <Popup trigger={buttonPopup} closePopup={() => setButtonPopup(false)}>
                <AddWork />
            </Popup>
        </div>

        
    );
}


export default Login;