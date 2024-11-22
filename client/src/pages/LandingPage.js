import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';

function LandingPage() {
    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate('/signup');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="signup-container d-flex justify-content-center align-items-center">
            <div className="card signup-card p-4 shadow-lg">
                <h2 className="text-center mb-4">Eclipse</h2>
                <h4 className="text-center mb-4">Your personal fitness tracker</h4>
                <button type="submit" className="btn btn-primary btn-block mt-4" onClick={goToSignUp}>Sign Up</button>
                <button type="submit" className="btn btn-primary btn-block mt-4" onClick={goToLogin}>Log In</button>
            </div>
        </div>
    );
}

export default LandingPage;