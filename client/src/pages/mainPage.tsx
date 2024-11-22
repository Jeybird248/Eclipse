import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainPage: React.FC = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Your Dashboard</h1>
      <div className="mt-4">
        <Link to="/diet">
          <button className="btn btn-primary btn-lg m-2">Diet Diary</button>
        </Link>
        <Link to="#">
          <button className="btn btn-secondary btn-lg m-2" disabled>
            Workout Planner (Coming Soon)
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
