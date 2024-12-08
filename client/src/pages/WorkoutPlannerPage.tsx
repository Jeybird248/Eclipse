import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WorkoutPlannerPage.css";
import LogoutButton from "../component/LogOut";

interface Workouts {
  title: string;
  description: string;
  bodyPart: string;
  equipment: string;
  level: string;
}

interface ExerciseInstance {
  planId: number;
  userId: string; 
  workoutPlan: string;
  date: string;
}
interface WorkoutPlanAndDietDiary {
  planId: number;
  user_id: number;
  workoutPlan: string;
  foodName: string;
  date_eaten: string;
}
interface dietDiary {
  user_id:number;
  foodName:string;
  date_eaten:string;
}

const WorkoutPlannerPage: React.FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [uniqueValues, setUniqueValues] = useState<{ [key: string]: string[] }>({});
  const [searchResults, setSearchResults] = useState<Workouts[]>([]);
  const [todayPlan, setTodayPlan] = useState<ExerciseInstance[]>([]);
  const [todayUserDiet, setTodayDietDiary] = useState<dietDiary[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [workoutAndDietTerm, setworkoutAndDietTerm] = useState<string>("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || "";
  const numUserId = parseInt(userId);
  const todayDate = new Date().toISOString().split("T")[0];
  
  useEffect(() => {
    const fetchUniqueValues = async () => {
      try {
        const response = await fetch("/api/workout/filters");
        const data = await response.json();
        setUniqueValues(data);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    const fetchTodayPlan = async () => {
      try {
        const response = await fetch(`/api/workoutInstance/getExercise/${userId}/${todayDate}`);
        const data = await response.json();
        console.log("Fetched Today's Plan:", data);
        setTodayPlan(data);
      } catch (error) {
        console.error("Error fetching today's plan:", error);
      }
    };

    const fetchTodayWorkoutPlanAndDietDiary = async () => {
      try {
        const response = await fetch(`/api/workoutInstance/getExercise/${userId}/${todayDate}`);
        const diet_response = await fetch(`/api/workoutAndDiet/dietDiary/${userId}/${todayDate}`);
        const data = await response.json();
        const diet_data = await diet_response.json();
        console.log("Fetched Today's Plan and Diet:", data, diet_data);
        setTodayPlan(data);
        setTodayDietDiary(diet_data);
      } catch (error) {
        console.error("Error fetching today's plan and diet:", error);
      }
    };

    fetchUniqueValues();
    fetchTodayPlan();
    fetchTodayWorkoutPlanAndDietDiary();
  }, [userId, todayDate]);

  useEffect(() => {
    console.log("Today Plan Updated:", todayPlan);
  }, [todayPlan]);

  const fetchExercises = async () => {
    try {
      const response = await fetch("/api/workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...filters, title: searchTerm }),
      });
      const data = await response.json();
      console.log("Fetched Exercises:", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const addToPlan = async (workout: Workouts) => {
    try {
      const response = await fetch(`/api/workoutInstance/getMaxPlanId/${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch max planId");
      }

      const data = await response.json();

      if (Array.isArray(data) && data[0] && data[0].maxPlanId !== undefined) {
        const newPlanId = Number(data[0].maxPlanId) + 1;
        console.log("maxPlanId:", data[0].maxPlanId);
        console.log("newPlanId:", newPlanId);

        const exerciseInstance: ExerciseInstance = {
          planId: newPlanId,
          userId, 
          workoutPlan: workout.title + " - " + workout.description,
          date: todayDate,
        };

        console.log("Adding to Plan:", exerciseInstance);

        const addResponse = await fetch("/api/workoutInstance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(exerciseInstance),
        });
        const result = await addResponse.json();
        console.log("Add to Plan Result:", result);

        setTodayPlan((prev) => [...prev, exerciseInstance]);
      } else {
        console.error("Received invalid or empty data from the API");
      }
    } catch (error) {
      console.error("Error adding exercise to plan:", error);
    }
  };

  const removeFromPlan = async (planId: number) => {
    try {
      console.log("remove from plan passing in", userId, planId, todayDate);
      const response = await fetch(`/api/workoutInstance/getExercise/${userId}/${planId}/${todayDate}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, planId, todayDate }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove exercise from plan");
      }

      setTodayPlan((prev) => prev.filter((item) => item.planId !== planId));
    } catch (error) {
      console.error("Error removing exercise from plan:", error);
    }
  };

  const addWorkoutPlanAndDiet = async (workoutPlan: string, foodName: string) => {
    try {
      const response = await fetch(`/api/workoutInstance/getMaxPlanId/${userId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch max planId");
      }
      
      const data = await response.json();

     if (Array.isArray(data) && data[0] && data[0].maxPlanId !== undefined) {
        const newPlanId = Number(data[0].maxPlanId) + 1;
        console.log("maxPlanId:", data[0].maxPlanId);
        console.log("newPlanId:", newPlanId);
        console.log("userId:", numUserId);
  
        const newWorkoutPlanAndDietDiary: WorkoutPlanAndDietDiary = {
          planId: newPlanId,
          user_id: numUserId,
          workoutPlan, 
          foodName,
          date_eaten: todayDate,
        };

        console.log("Adding new workout plan and diet diary:", newWorkoutPlanAndDietDiary);

        const addResponse = await fetch("/api/workoutAndDiet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newWorkoutPlanAndDietDiary),
        });
        const result = await addResponse.json();
        console.log("Add to Workout Plan and Diet Result:", result);
      } else {
        console.error("Received invalid or empty data from the API");
      }
    } catch (error) {
      console.error("Error adding workout plan and diet:", error);
    }
  };

  const removeWorkoutPlanAndDiet = async (planId: number, workoutPlan: string, foodName: string) => {
    try {
      console.log("remove workout plan and diet passing in", planId, userId, workoutPlan, foodName, todayDate);
      const response = await fetch(`/api/workoutAndDiet/getWorkoutPlan/${planId}/${userId}/${workoutPlan}/${foodName}/${todayDate}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, userId, workoutPlan, foodName, todayDate }),
      });
      console.log("Successfully removed workout plan and diet")

      if (!response.ok) {
        throw new Error("Failed to remove workout plan and diet");
      }
    } catch (error) {
      console.error("Error removing workout plan and diet:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleWorkoutAndDietChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setworkoutAndDietTerm(event.target.value);
  };

  const handleSearchClick = () => {
    fetchExercises();
  };

  const handleCheckboxChange = (category: string, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category] || [];
      return {
        ...prev,
        [category]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  const toggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  return (
    <div className="workout-page">
      <LogoutButton />
      <div className="left-pane">
        <h1>Search Exercises, Workout Plan, and Diet</h1>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search exercises..."
            aria-label="Search Exercises"
          />
          <button onClick={handleSearchClick} aria-label="Search">
            Search
          </button>
        </div>
        <div className="filter-dropdown">
          <button
            className="filter-dropdown-button"
            onClick={toggleFilters}
            aria-expanded={filtersVisible ? "true" : "false"}
          >
            Filters
          </button>
          {filtersVisible && (
            <div className="filter-dropdown-content">
              {Object.entries(uniqueValues).map(([category, options]) => (
                <div key={category} className="filter-group">
                  <h4>{category}</h4>
                  <div className="filter-list">
                    {options.map((option) => (
                      <label key={option}>
                        <input
                          type="checkbox"
                          checked={filters[category]?.includes(option)}
                          onChange={() => handleCheckboxChange(category, option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="workout-list">
          {searchResults.map((workout) => (
            <div key={workout.title} className="workout-item">
              <span className="workout-details">
                {workout.title} - {workout.description}
              </span>
              <button
                onClick={() => {
                  const workoutExists = todayPlan.some((item) => item.workoutPlan === workout.title);
                  if (!workoutExists) {
                    addToPlan(workout);
                  } else {
                    const workoutToRemove = todayPlan.find(
                      (item) => item.workoutPlan === workout.title
                    );
                    if (workoutToRemove) {
                      removeFromPlan(workoutToRemove.planId);
                    }
                  }
                }}
                className="add-button"
              >
                Add
              </button>
            </div>
          ))}
        </div>
        <div className="search-container">
          <input
            type="text"
            value={workoutAndDietTerm}
            onChange={handleWorkoutAndDietChange}
            placeholder="Input your workout plan and diet..."
            aria-label="Input Workout Plan and Diet"
          />
          <button aria-label="Add Workout Plan and Diet Entry" onClick={() => {
          const input = workoutAndDietTerm.split(",").map(part => part.trim().toLowerCase());
          const workoutPlan = input[0];
          const diet = input[1];

          const workoutPlanExists = todayPlan.some((item) => item.workoutPlan === workoutPlan);
          const dietExists = todayUserDiet.some((item) => item.foodName === diet);
          if (!workoutPlanExists && !dietExists) {
            addWorkoutPlanAndDiet(workoutPlan, diet);
          } else {
            console.log("Cannot add entry");
          } 
        }}>
          Add Workout Plan and Diet Entry
        </button>
        <button onClick={() => {
            const input = workoutAndDietTerm.split(",").map(part => part.trim().toLowerCase());
            const workoutPlan = input[0];
            const diet = input[1];
  
            const workoutPlanExists = todayPlan.some((item) => item.workoutPlan === workoutPlan);
            const dietExists = todayUserDiet.some((item) => item.foodName === diet);
            if (workoutPlanExists && dietExists) {
              const workoutPlanToRemove = todayPlan.find(
                (item) => item.workoutPlan === workoutPlan
              );
              const dietToRemove = todayUserDiet.find(
                (item) => item.foodName === diet
              );
              if (workoutPlanToRemove && dietToRemove) {
                removeWorkoutPlanAndDiet(workoutPlanToRemove.planId, workoutPlanToRemove.workoutPlan, dietToRemove.foodName);
              }
            }
        }}>
          Remove Workout Plan and Diet Entry
        </button>
        </div>
      </div>

      <div className="right-pane">
        <h1>Today's Plan</h1>
        <ul>
          {todayPlan.map((workout) => (
            <li key={workout.planId}>
              <label>
                <input
                  type="checkbox"
                  checked
                  onChange={() => removeFromPlan(workout.planId)}
                />
                {workout.workoutPlan}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutPlannerPage;
