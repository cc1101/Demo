import React, {useContext, useEffect, useState} from 'react';
import '../static/Profile.css'; // Assume that CSS is in Profile.css file
import {AuthContext} from "../context/AuthContext";

const Profile = () => {
    const {user, updateUser, logout} = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [inputs, setInputs] = useState({
        username: user.username? user.username:'',
        gender: user.gender? user.gender:'',
        firstName: user.firstName? user.firstName:'',
        lastName: user.lastName? user.lastName:'',
        email: user.email? user.email:'',
        password: '',
        company: user.company? user.company:'',
    });
    const isFormValid = () => {
        const requiredFields = ['gender', 'lastName', 'email', 'password'];
        return requiredFields.every((field) => inputs[field].trim() !== '') && isEmailValid(inputs.email);
    };
    useEffect(() => {
        setInputs({
            username: user.username? user.username:'',
            gender: user.gender? user.gender:'',
            firstName: user.firstName? user.firstName:'',
            lastName: user.lastName? user.lastName:'',
            email: user.email? user.email:'',
            password: '',
            company: user.company? user.company:'',
        });
    }, [user]);
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
        setIsEditing(false);
        updateUser(inputs);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleBackClick = () => {
        setIsEditing(false);
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>User Profile</h2>
                <div className="profile-details">
                    {isEditing
                        ? (

                            <div className="signup-container">
                                <form onSubmit={handleSubmit} className="signup-form">
                                    <label>Anrede*</label>
                                    <select
                                        name="gender"
                                        value={inputs.gender}
                                        onChange={handleInputChange}
                                        className={inputs.gender?'': 'required'}>
                                        <option value="">Select Anrede</option>
                                        <option value="Herr">Herr</option>
                                        <option value="Frau">Frau</option>
                                    </select>

                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder={user.firstName}
                                        value={inputs.firstName}
                                        onChange={handleInputChange}
                                    />

                                    <label>Last Name*</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder={user.lastName}
                                        value={inputs.lastName}
                                        onChange={handleInputChange}
                                        className={inputs.lastName?'' : 'required'}
                                    />

                                    <label>Email*</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={user.email}
                                        value={inputs.email}
                                        onChange={handleInputChange}
                                        className={`${!inputs.email || !isEmailValid(inputs.email) ? 'required' : ''}`}
                                    />

                                    <label>Password*</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="New Password"
                                        value={inputs.password}
                                        onChange={handleInputChange}
                                        className={inputs.password?'': 'required'}
                                    />

                                    <label>Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder={user.company}
                                        value={inputs.company}
                                        onChange={handleInputChange}
                                    />
                                    {!isFormValid() && (
                                        <p className="form-warning">
                                            Please fill in all required fields marked with *.
                                        </p>
                                    )}
                                    <button type="submit" className='green-border-button' disabled={!isFormValid()}>
                                        Save
                                    </button>
                                </form>
                            </div>

                        )
                        : (
                            <div>
                                <div className="info-row">
                                    <label>Username:</label>
                                    <div>{user.username}</div>
                                </div>
                                <div className="info-row">
                                    <label>Anrede:</label>
                                    <div>{user.gender}</div>
                                </div>

                                <div className="info-row">
                                    <label>First Name:</label>
                                    <div>{user.firstName}</div>
                                </div>

                                <div className="info-row">
                                    <label>Last Name:</label>
                                    <div>{user.lastName}</div>
                                </div>

                                <div className="info-row">
                                    <label>Email:</label>
                                    <div>{user.email}</div>
                                </div>

                                <div className="info-row">
                                    <label>Password:</label>
                                    <div>******</div>
                                </div>

                                <div className="info-row">
                                    <label>Company:</label>
                                    <div>{user.company}</div>
                                </div>

                            </div>
                        )
                    }
                </div>
                {isEditing ? <button onClick={handleBackClick}>Back to profile</button> :
                    <button onClick={handleEditClick} className='green-border-button'>Edit</button>
                }
            </div>
        </div>
    );
}

export default Profile;


