import React, { useState } from "react";
import 'antd/dist/antd.css';
import '../../App.css';
import { Link } from "react-router-dom/";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    //   const handleSubmit = e => {
    //     e.preventDefault();}
    return(
    <div className="container">    
        <div className="login_container" >
            <div className="wrap-login flex column">
                <div className="title">Task Manager</div>
                <form >
                    <div className="flex row align-center mb-20">
                        <div className="label">Email</div>

                        <input
                            className="input_text"
                            type="text"
                            placeholder="Your e-mail"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                    </div>
                    <div className="flex row align-center mb-20">
                        <div className="label">Password</div>

                        <input
                            className="input_text"
                            type="password"
                            placeholder="Your password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                    </div>
                    <div className="flex justify-center mb-20">
                        <Link to="/home" className="btn" >Login</Link>
                    </div>
           
                </form>
              
            </div>
        </div>
    </div>)

}
export default Login