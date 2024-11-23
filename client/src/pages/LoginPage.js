import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LandingPage.css';

function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('');

    const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            navigate('/main');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.username) formErrors.username = 'User ID is required.';
        if (!formData.password) formErrors.password = 'Password is required.';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const apiBaseURL = process.env.REACT_APP_API_BASE_URL || '';
                const endpoint = `${apiBaseURL}/auth/login`;
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                    }),
                });
                const data = await response.json();

                if (response.ok) {
                    // Save user ID to localStorage
                    localStorage.setItem('userId', data.user_id);
                    setSubmissionStatus('success');
                    navigate('/main');
                } else {
                    setSubmissionStatus('error');
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error connecting to the server:', error);
                setSubmissionStatus('error');
            }
        } else {
            setSubmissionStatus('error');
        }
    };

    return (
        <div className="signup-container d-flex justify-content-center align-items-center">
            <div className="card signup-card p-4 shadow-lg">
                <h2 className="text-center mb-4">Log In to Your Account</h2>
                <p className="text-center mb-4">
                    Please enter your username and password to access your account.
                </p>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="username">User ID</label>
                        <input
                            type="text"
                            className={`form-control ${
                                errors.username ? 'is-invalid' : ''
                            }`}
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
                            className={`form-control ${
                                errors.password ? 'is-invalid' : ''
                            }`}
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">{errors.password}</div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mt-4">
                        Log In
                    </button>

                    {submissionStatus === 'error' && (
                        <div className="alert alert-danger mt-3 text-center">
                            Please check your credentials.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
