import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FoodPage from './pages/foodPage';
import DietPage from './pages/dietPage';
import SignUpPage from './pages/SignUpPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/mainPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/main" element={<MainPage />} />
        
        <Route path="/diet" element={<DietPage />} />
        <Route path="/food" element={<FoodPage />} /> 
      </Routes>
    </Router>
    );
  }

export default App;