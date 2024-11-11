import React from 'react';
import SignUpPage from './components/SignUpPage';
import LandingPage from './components/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />}/>
                    <Route path="/signup" element={<SignUpPage />}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;