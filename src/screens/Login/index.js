import React, { useState } from "react";
import 'antd/dist/antd.css';
import '../../App.css';
import history from "../../history";
import { Row, Col } from "antd";

function Login(){
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage] = useState("Email can't be blank!");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage] = useState("Password can't be blank!");

    const resetErrors = () => {
        setEmailError(false);
        setPasswordError(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        resetErrors();

        if (!email) {
            setEmailError(true);
        }
        if (!password) {
            setPasswordError(true);
        }
        if (!email || !password) {
            return;
        }
        history.push("home");
    }

    
    return(
    <div className="container">    
        <div className="login_container" >
            <div className="wrap-login flex column">
            <Row>
                <Col  span={24} xl={24}>
                <div className="title">Task Manager</div>
                <form >
                    <div className="flex row align-center">
                          <div className="error text-align-end width100">
                            {emailError && emailErrorMessage}   
                          </div>
                    </div>
                    <div className="flex row align-center mb-20">
                        <div className="label">Email</div>

                        <input
                            className="input_text"
                            type="text"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                    </div>
                    <div className="flex row align-center">
                        {passwordError &&
                          <div className="error text-align-end width100">
                            {passwordErrorMessage}
                          </div>
                        }
                    </div>
                    <div className="flex row align-center mb-20">
                        <div className="label">Password</div>

                        <input
                            className="input_text"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                    </div>
                    <div className="flex justify-center mb-20">

                    <button type="primary" className="btn" onClick={handleSubmit} >Login</button>
                    </div>
           
                </form>
                </Col>
        </Row>
            </div>
        </div>
       
    </div>)

}
export default Login