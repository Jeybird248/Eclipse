

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodList from "../component/foodList";
import { dietDairy, searchDietDairyData } from "../services/services";

type MealEntry = {
  date: string;
  meal: string;
};

const DietPage = () => {
  const [date, setDate] = useState<string>('');
  const [entries, setEntries] = useState<MealEntry[]>([]);
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState<dietDairy[]>([]); 
  const [showFoodList, setShowFoodList] = useState<boolean>(false);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    setShowFoodList(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!date) return;

      try {
        const data = await searchDietDairyData(date);
        console.log("Diet Dairy Data:", data);
        setFoodData(data);

        // Map dietDairy entries to meal entries and update state
        setEntries(
          data.map((dietDairy) => ({
            date: dietDairy.date_eaten,
            meal: dietDairy.foodName,
          }))
        );
      } catch (error) {
        console.error("Error fetching diet dairy data:", error);
      }
    };

    fetchData();
  }, [date]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!date) { 
      alert('Please select a date before adding a meal.'); 
      return;
    }
    navigate(`/food`);
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-5 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Diet Diary</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md focus:outline-none focus:shadow-outline"
          >
            Add Meal
          </button>
        </form>
        <div className="mt-6">
          <ul className="mt-2 space-y-2">
            {entries.map((entry, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded-lg">
                {`${entry.date}: ${entry.meal}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showFoodList && (
        <div className="mt-6 mx-auto p-5 bg-white shadow-md">
          <h2 className="text-xl font-semibold">Food List</h2>
          {/* <FoodList foodData={foodData} /> */}
        </div>
      )}
    </>
  );
};

export default DietPage;
