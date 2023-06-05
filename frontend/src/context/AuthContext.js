import {createContext, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";




export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const API_HOST = process.env.REACT_APP_API_HOST || 'localhost';
    const API_PORT = process.env.REACT_APP_API_PORT || '8080';
    const navigate = useNavigate()
    const [user, setUser] = useState( ()=>sessionStorage.getItem('user') ?JSON.parse(sessionStorage.getItem('user')):null);
    const [authTokens, setAuthTokens] = useState(() => sessionStorage.getItem('authTokens') ? sessionStorage.getItem('authTokens') : null);
    const [userExistError, setUserExistError] = useState(null);
    const [signUpError, setSignUpError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [profile, setProfile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [isChangedPassword, setIsChangedPassword] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);


    const signup = async (e) => {
        e.preventDefault();

        const { gender, lastName, email, username, password } = e.target.elements;
        try {
            const response = await fetch(`http://${API_HOST}:${API_PORT}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        gender: gender.value,
                        lastname: lastName.value,
                        email: email.value,
                        username: username.value,
                        password: password.value,
                    }),
            });

            if (response.ok) {
                setSignupSuccess(true);
                setSignUpError('');
                navigate("/confirmation"); // Redirect to the confirmation page

            } else {

                setSignUpError("Cannot Creat User in Backend, Username may already exits"); // The error message is the response text
                setShowAlert(true)
            }
        } catch (error) {
            console.error('Error:', error);
            setSignUpError('Error');
            setShowAlert(true)
        }
    };
    const updateUser = async (inputs) => {
        try {
            const response = await fetch(`http://${API_HOST}:${API_PORT}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(authTokens)
                },
                body: JSON.stringify(
                    {
                        gender: inputs.gender,
                        lastname: inputs.lastName,
                        email: inputs.email,
                        username: inputs.username,
                        password: inputs.password,
                        firstname: inputs.firstName,
                        company:inputs.company
                    }),
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                sessionStorage.setItem('user', JSON.stringify(data.user));
            } else {
                console.error('Error fetching profile:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    const login = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://${API_HOST}:${API_PORT}/authenticate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            });

           if(response.ok){
                const data = await response.json();
                setUser(data.user);
                sessionStorage.setItem('user', JSON.stringify(data.user));
                setAuthTokens(JSON.stringify(data.jwtToken))
                sessionStorage.setItem('authTokens', JSON.stringify(data.jwtToken));
                navigate(`/${data.user.username}/profile`);
            }else{
               setLoginError("Login failed, wrong username or password!")
               setShowAlert(true);
           }

        } catch (error) {
            console.error('Error:', error);
            setLoginError(error.message);
            setShowAlert(true);
        }
    };

    const logout = () => {
        setUser(null)
        setAuthTokens(null)
        // setAuthTokens(null)
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('authTokens')
        navigate('/')
    };

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000); // 5000 milliseconds = 5 seconds
            // Clean up the timer when the component is unmounted or the effect is re-run
            return () => clearTimeout(timer);
        }
    }, [showAlert]);


    const value = {
        userExistError,
        signUpError,
        user,
        setUser,
        setUserExistError,
        setSignUpError,
        loginError,
        // authTokens,
        setProfile,
        profile,
        setLoginError,
        showAlert,
        isChangedPassword,
        setIsChangedPassword,
        signupSuccess,
        setSignupSuccess,
        signup,
        login,
        logout,
        updateUser,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

