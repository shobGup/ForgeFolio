import React from "react";
const Login = () => {
    return (
        <div>
            {/* Logo */}
            <img src={process.env.PUBLIC_URL + "/images/Logo_no_Text.png"} className="" alt="ForgeFolio Logo with no Text"/>

            {/* Title */}
            <h1>ForgeFolio</h1>

            {/* Login Form */}
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Login</h1>

                        <form>
                            <label>Username</label>
                            <input></input>

                            <label>Password</label>
                            <input></input>
                            
                            {/* Checkbox */}
                            <input type="checkbox"></input>
                            <label>Remember Me?</label>
                            
                            {/* Login Button */}
                            <button>LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>


            <a href="/" className="center-text">Forgot password?</a>
            <p className="center-text">Need an account? <a href="/">SIGN UP</a></p>

        </div>
    );
}


export default Login;