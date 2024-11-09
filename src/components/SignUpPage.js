import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpPage.css'; // Custom CSS file for additional styling

function SignUpPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fitnessGoals: '',
        height: '',
        weight: '',
        age: '',
        fitnessLevel: ''
    });
    const [errors, setErrors] = useState({});
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.username) formErrors.username = "Username is required.";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = "A valid email is required.";
        if (!formData.password) formErrors.password = "Password is required.";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setSubmissionStatus('success');
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">{errors.email}</div>
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

                    {/* Optional Fields */}
                    <h5 className="mt-4">Additional Information</h5>
                    <div className="form-group">
                        <label htmlFor="fitnessGoals">Initial Fitness Goals</label>
                        <textarea
                            className="form-control"
                            id="fitnessGoals"
                            value={formData.fitnessGoals}
                            onChange={handleChange}
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="height">Height (cm)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="height"
                            value={formData.height}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weight">Weight (kg)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="weight"
                            value={formData.weight}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fitnessLevel">Fitness Level</label>
                        <select
                            className="form-control"
                            id="fitnessLevel"
                            value={formData.fitnessLevel}
                            onChange={handleChange}
                        >
                            <option value="">Select your fitness level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    {/* Submission Button and Feedback */}
                    <button type="submit" className="btn btn-primary btn-block mt-4">Sign Up</button>

                    {submissionStatus === 'success' && (
                        <div className="alert alert-success mt-3 text-center">Registration successful!</div>
                    )}
                    {submissionStatus === 'error' && (
                        <div className="alert alert-danger mt-3 text-center">Please correct the errors in the form.</div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default SignUpPage;
