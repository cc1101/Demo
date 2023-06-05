import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../static/SignUp.css';
import {Alert} from "react-bootstrap";

const SignUp = () => {
    const { signup ,showAlert,signUpError} = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        gender: '',
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        company: '',
    });
    const isFormValid = () => {
        const requiredFields = ['gender', 'lastName', 'email', 'username', 'password'];
        return requiredFields.every((field) => inputs[field].trim() !== '') && isEmailValid(inputs.email);
    };

    const isEmailValid = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };
    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(e);
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {signUpError && showAlert && (
                <Alert variant="danger" className="mt-3">
                    {signUpError}
                </Alert>
            )}
            <form onSubmit={handleSubmit} className="signup-form">
                <label>Anrede*</label>
                <select
                    name="gender"
                    value={inputs.gender}
                    onChange={handleInputChange}
                    className={inputs.gender ?'': 'required'}>
                    <option value="">Select Anrede</option>
                    <option value="Herr">Herr</option>
                    <option value="Frau">Frau</option>
                </select>

                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={inputs.firstName}
                    onChange={handleInputChange}
                />

                <label>Last Name*</label>
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={inputs.lastName}
                    onChange={handleInputChange}
                    className={inputs.lastName?'': 'required'}
                />

                <label>Email*</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={handleInputChange}
                    className={`${!inputs.email || !isEmailValid(inputs.email) ? 'required' : ''}`}
                />

                <label>Username*</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={inputs.username}
                    onChange={handleInputChange}
                    className={inputs.username?'': 'required'}
                />

                <label>Password*</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    className={inputs.password ?'': 'required'}
                />

                <label>Company</label>
                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={inputs.company}
                    onChange={handleInputChange}
                />
                {!isFormValid() && (
                    <p className="form-warning">
                        Please fill in all required fields marked with *.
                    </p>
                )}
                <button type="submit" className={isFormValid()?'green-border-button':''} disabled={!isFormValid()}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
