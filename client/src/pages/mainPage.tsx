import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutButton from '../component/LogOut';
import './mainPage.css';

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <LogoutButton />
      <h1>Welcome to Your Dashboard</h1>
      {/* <h2>Fitness Goals</h2>
      <ul className="card">
        <li>Lose 50 pounds by the end of the year</li>
        <li>Gain 20 pounds of muscle</li>
      </ul>
      <h2>Saved Workout Plans</h2>
      <ul className="card">
        <li>My Workout Plan 1</li>
      </ul>
      <h2>Progress Summary</h2>
      <ul className="card">
        <li>50% - Lose 50 pounds by the end of the year</li>
        <li>30% - Gain 20 pounds of muscle</li>
      </ul> */}
      <div className="mt-4">
        <Link to="/diet">
          <button className="btn btn-primary btn-lg m-2">Diet Diary</button>
        </Link>
        <Link to="/workoutplanner">
          <button className="btn btn-secondary btn-lg m-2">Workout Planner</button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
