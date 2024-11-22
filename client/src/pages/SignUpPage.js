import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpPage.css'; 
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [isOverlayVisible, setIsOverlayVisible] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.username) formErrors.username = "Username is required.";
        if (!formData.password) formErrors.password = "Password is required.";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleBackendSubmission = async () => {
        const apiBaseURL = process.env.REACT_APP_API_BASE_URL || '';
        const endpoint = `${apiBaseURL}/auth/signup`;
        console.log(endpoint);
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            
            let data;
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                throw new Error('Invalid response format from server.');
            }

            if (response.status === 201) {
                setSubmissionStatus('success');
                setIsOverlayVisible(true); 
                setTimeout(() => {
                    setIsOverlayVisible(false); 
                    navigate('/login'); 
                }, 1000); 
            } else {
                setSubmissionStatus(data.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setSubmissionStatus('An unexpected error occurred. Please try again.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleBackendSubmission();
        } else {
            setSubmissionStatus('error');
        }
    };

    return (
        <div className="signup-container d-flex justify-content-center align-items-center">
            <div className="card signup-card p-4 shadow-lg">
                <h2 className="text-center mb-4">Create Your Account</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">{errors.username}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">{errors.password}</div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mt-4">Sign Up</button>

                    {submissionStatus === 'success' && (
                        <div className="alert alert-success mt-3 text-center">
                            Registration successful! Redirecting to login...
                        </div>
                    )}
                    {submissionStatus === 'error' && (
                        <div className="alert alert-danger mt-3 text-center">Please correct the errors in the form.</div>
                    )}
                    {submissionStatus && submissionStatus !== 'success' && submissionStatus !== 'error' && (
                        <div className="alert alert-danger mt-3 text-center">{submissionStatus}</div>
                    )}
                </form>
            </div>

            {/* Overlay */}
            {isOverlayVisible && (
                <div className="overlay">
                    <div className="overlay-message">
                        Account created! Redirecting to login...
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignUpPage;
