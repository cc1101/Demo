import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import {useNavigate} from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

const SignUpConfirmationPage = () => {
    const { signupSuccess, setSignupSuccess} = useContext(AuthContext);
    const navigate = useNavigate();
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        if (signupSuccess) {
            const interval = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);
            setTimeout(() => {
                setSignupSuccess(false);
                navigate("/login");
            }, 5000);
            return () => clearInterval(interval); // clear on component unmount
        }
    }, [signupSuccess, navigate]);

    return (
        <>

            {signupSuccess &&
                <Alert variant="success">
                    Registration successful! A confirmation email has been sent to your address.
                    You will be redirected to login page in
                    <span style={{ color: 'red' }}> {/* Inline style to color the counter */}
                        {counter}
                    </span>
                     seconds
                </Alert>
            }
        </>
    );
};

export default SignUpConfirmationPage;


