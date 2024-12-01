import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './WorkoutPlannerPage.css';
import LogoutButton from '../component/LogOut';
import SearchBar from '../component/searchBar';

interface Workouts {
  title: string;
  description: string;
  exerciseType: string;
  bodyPart: string;
  equipment: string;
  level: string;
}

const WorkoutPlannerPage: React.FC = () => {
  const [isExerciseVisible, setIsExerciseVisible] = useState<boolean>(false);
  const [isWorkoutSaved, setIsWorkoutSaved] = useState<boolean>(false);
  const [isWorkoutEdited, setIsWorkoutEdited] = useState<boolean>(false);

  const handleSearch = (searchTerm: string) => {
    console.log();
  }

  const handleSave = () => {
    setIsWorkoutSaved(true);
    setTimeout(() => {
      setIsWorkoutSaved(false);
    }, 3000);
  }

  const handleEdit = () => {
    setIsWorkoutEdited(true);
    setTimeout(() => {
      setIsWorkoutEdited(false);
    }, 3000);
  }

  return (
    <div className="workout-page">
    <LogoutButton />
    <h1>Create Your Workout Plan</h1>
    <SearchBar onSearch={handleSearch}/>
    <button className="workout-button" onClick={handleSave}>Save Workout Plan</button>
    <button className="workout-button" onClick={handleEdit}>Edit Workout Plan</button>
    {isWorkoutSaved ? (
      <p>Workout successfully saved!</p>
    ) : null}
    {isWorkoutEdited ? (
      <p>Workout successfully edited!</p>
    ) : null}
    </div>
  );
  // const [date, setDate] = useState<string>('');
  // const [entries, setEntries] = useState<DietDiaryEntry[]>([]);
  // const [isListVisible, setIsListVisible] = useState<boolean>(false);
  // const userId = Number(localStorage.getItem('userId'));
  // const navigate = useNavigate(); 

  // const handleSubmit = async () => {
  //   if (!date) {
  //     alert('Please select a date!');
  //     return;
  //   }

  //   console.log("UserId:", userId);
  //   console.log("Selected Date:", date);

  //   try {
  //     const response = await fetch(`/api/diet-diary/${userId}/${date}`);
  //     if (!response.ok) {
  //       throw new Error(`Error fetching diet diary: ${response.statusText}`);
  //     }
  //     const data: DietDiaryEntry[] = await response.json();

  //     console.log("Fetched entries:", data);

  //     setEntries(data);
  //     setIsListVisible(true);
  //   } catch (error) {
  //     console.error('Failed to fetch diet diary:', error);
  //   }
  // };

  // const handleClear = () => {
  //   setDate('');
  //   setIsListVisible(false);
  // };

  // const handleEditDietDiary = () => {
  //   if (!date) {
  //     alert('Please select a date to edit!');
  //     return;
  //   }
  //   navigate(`/food?date=${date}`);
  // };

  // return (
  //   <div className="diet-page">
  //     <LogoutButton />
  //     <h1>Diet Diary</h1>
  //     <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
  //     <button onClick={handleSubmit} disabled={!date}>Show Meals</button>
  //     <button onClick={handleClear}>Clear</button>

  //     {/* Button to edit diet diary (takes user to the FoodPage) */}
  //     <button onClick={handleEditDietDiary} disabled={!date}>
  //       Edit Diet Diary
  //     </button>

  //     {/* Conditionally render the entries block below */}
  //     {isListVisible ? (
  //       entries.length > 0 ? (
  //         <div className="diet-list">
  //           <h2>Meals for {date}</h2>
  //           <ul>
  //             {entries.map((entry, index) => (
  //               <li key={index}>
  //                 {entry.foodName} - {entry.calories} calories, {entry.protein}g protein
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       ) : (
  //         <p>There are no current diet diaries for this date. Press "Edit Diet Diary" to add one!</p>
  //       )
  //     ) : null}
  //   </div>
  // );
};

export default WorkoutPlannerPage;
