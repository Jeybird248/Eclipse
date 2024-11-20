import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import FoodPage from './pages/foodPage';
import DietPage from './pages/dietPage';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/food" element={<FoodPage />} /> 
        <Route path="/" element={<DietPage />} />
      </Routes>
    </Router>
    );
  }

export default App;