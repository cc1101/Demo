import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate
} from 'react-router-dom'
import {AuthProvider} from "./context/AuthContext"
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from "./pages/Home";
import React from "react";
import Profile from "./pages/Profile";
import PrivateRoute from "./utils/PrivateRoute"
import Navigation from "./components/Navigation";
import SignUpConfirmationPage from "./pages/SignUpConfirmation";


const App = () => {
    return (
        <div className='app'>
            <Router>
                <AuthProvider>
                    <Navigation/>
                        <Routes>
                            <Route exact path="/" element={<Home/>}/>
                            <Route exact path="login" element={<Login/>}/>
                            <Route exact path="signup" element={<SignUp/>}/>
                            <Route exact path="confirmation" element={<SignUpConfirmationPage/>}/>
                            <Route exact path=":username/profile" element={<PrivateRoute/>}>
                                <Route exact path="" element={<Profile/>}/>
                            </Route>
                            <Route path="*" element={<Navigate to="/"/>}/>
                        </Routes>

                </AuthProvider>
            </Router>
        </div>
    );
};

export default App;
