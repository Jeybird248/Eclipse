import React, { useState, useEffect, useCallback } from 'react'; 
import axios from 'axios';
import './foodPage.css';
import LogoutButton from '../component/LogOut';


interface Food {
  foodName: string;
  calories: number;
  protein: number;
  grams: number;
}

interface DietDiary {
  foodName: string;
  calories: number;
  protein: number;
  grams: number;
}

const FoodPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [dietDiary, setDietDiary] = useState<DietDiary[]>([]);
  const date = localStorage.getItem('selected_-date') || '';
  const userId = Number(localStorage.getItem('userId'));

  
  const fetchDietDiary = useCallback(async () => {
    try {
      console.log(`Fetching diet diary for userId: ${userId} and date: ${date}`);
      const response = await axios.get(`/api/diet-diary/${userId}/${date}`);
      console.log('Fetched diet diary:', response.data);
      setDietDiary(response.data);
      console.log('Updated dietDiary state:', response.data);
    } catch (error) {
      console.error('Failed to fetch diet diary:', error);
    }
  }, [userId, date]);

  
  useEffect(() => {
    if (userId && date) {
      console.log("Calling fetchDietDiary");
      fetchDietDiary();
    } else {
      console.log("This is date:" + date);
      console.error("UserId or Date is missing. Cannot fetch diet diary.");
    }
  }, [userId, date, fetchDietDiary]); 

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      const response = await axios.get(`/api/food`, { params: { search: query } });
      setFoodData(response.data);
    } catch (error) {
      console.error('Failed to fetch food:', error);
    }
  };

  const toggleFood = async (foodName: string) => {
    try {
      if (dietDiary.some((entry) => entry.foodName === foodName)) {
        await axios.delete(`/api/diet-diary/${userId}/${date}/${foodName}`);
      } else {
        await axios.post(`/api/diet-diary`, { userId, foodName, date });
      }
      fetchDietDiary();
    } catch (error) {
      console.error('Failed to update diet diary:', error);
    }
  };

  return (
    <div className="food-page">
      <LogoutButton />
      <div className="left-pane">
        
        <h1>Search Food for {date}</h1>
        <input
          type="text"
          placeholder="Search food"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <ul className="food-results">
          {foodData.map((food) => (
            <li key={food.foodName}>
              <button onClick={() => toggleFood(food.foodName)}>Add</button>
              {food.foodName} - {food.calories} calories, {food.protein}g protein
            </li>
          ))}
        </ul>
      </div>
      <div className="right-pane">
        <h1>Diet Diary</h1>
        <ul className="diary-list">
          {dietDiary.length === 0 ? (
            <li>No entries for {date} yet. Start adding food!</li>
          ) : (
            dietDiary.map((entry) => (
              <li key={entry.foodName}>
                <button onClick={() => toggleFood(entry.foodName)}>Remove</button>
                {entry.foodName} - {entry.calories} calories, {entry.protein}g protein
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FoodPage;
