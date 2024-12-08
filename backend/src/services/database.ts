import { Exercise } from "../models/workout";
import { Food } from "../models/food";
import { dietDiary } from "../models/dietDiary";
import { getPool } from './connection';
import { ExerciseInstance } from "../models/workoutInstance";
import { WorkoutPlanAndDietDiary } from "../models/workoutPlanAndDietDiary";


export async function getAllFood(): Promise<Food[]> {
  const pool = await getPool();
  try {
    const [rows] = await pool.query('SELECT * FROM Food;');
    return rows as Food[];
  } catch (error) {
    console.error('Error fetching all food:', error);
    throw new Error('Failed to fetch all food.');
  }
}

export async function getFoodByName(foodName: string): Promise<Food[]> {
  const pool = await getPool();
  try {
    const [rows] = await pool.query('SELECT * FROM Food WHERE foodName LIKE ?;', [`%${foodName}%`]);
    return rows as Food[];
  } catch (error) {
    console.error('Error fetching food by name:', error);
    throw new Error('Failed to fetch food by name.');
  }
}

export async function addFood(food: Food): Promise<void> {
  const pool = await getPool();
  try {
    await pool.query(
      "INSERT INTO Food (foodName, measure, grams, calories, protein) VALUES (?, ?, ?, ?, ?)",
      [food.foodName, food.measure, food.grams, food.calories, food.protein]
    );
  } catch (error) {
    console.error('Error adding food:', error);
    throw new Error('Failed to add food.');
  }
}


export async function getAllDietDiary(userId: number): Promise<dietDiary[]> {
  const pool = await getPool();
  try {
    const [rows] = await pool.query('SELECT * FROM UserDiet WHERE user_id = ?;', [userId]);
    return rows as dietDiary[];
  } catch (error) {
    console.error('Error fetching diet diary:', error);
    throw new Error('Failed to fetch diet diary.');
  }
}

export async function getDietDiaryByDate(userId: number, date: string): Promise<dietDiary[]> {
  const pool = await getPool();
  try {
    const [rows] = await pool.query('SELECT * FROM UserDiet WHERE user_id = ? AND date_eaten = ?;', [userId, date]);
    return rows as dietDiary[];
  } catch (error) {
    console.error('Error fetching diet diary by date:', error);
    throw new Error('Failed to fetch diet diary by date.');
  }
}

export async function addDietDiaryEntry(userId: number, foodName: string, date: string): Promise<void> {
  const pool = await getPool();
  try {
    await pool.query('INSERT INTO UserDiet (user_id, foodName, date_eaten) VALUES (?, ?, ?);', [userId, foodName, date]);
  } catch (error) {
    console.error('Error adding diet diary entry:', error);
    throw new Error('Failed to add diet diary entry.');
  }
}

export async function deleteDietDiaryEntry(userId: number, foodName: string, date: string): Promise<void> {
  const pool = await getPool();
  try {
    await pool.query('DELETE FROM UserDiet WHERE user_id = ? AND foodName = ? AND date_eaten = ?;', [userId, foodName, date]);
  } catch (error) {
    console.error('Error removing diet diary entry:', error);
    throw new Error('Failed to remove diet diary entry.');
  }
}


export async function getAllExercises(): Promise<Exercise[]> {
  const pool = await getPool();
  try {
    const [rows] = await pool.query('SELECT * FROM Workouts;');
    return rows as Exercise[];
  } catch (error) {
    console.error('Error fetching all exercises:', error);
    throw new Error('Failed to fetch all exercises.');
  }
}

export async function getExercisesByFilters(filters: Partial<Exercise>): Promise<Exercise[]> {
  const pool = await getPool();
  try {
    const { bodyPart, equipment, level, title } = filters;

    
    let query = 'SELECT * FROM Workouts WHERE 1=1';
    const queryParams: any[] = []; 

    

    if (bodyPart) {
      query += ' AND bodyPart LIKE ?';
      queryParams.push(`%${bodyPart}%`);
    }

    if (equipment) {
      query += ' AND equipment LIKE ?';
      queryParams.push(`%${equipment}%`);
    }

    if (level) {
      query += ' AND level LIKE ?';
      queryParams.push(`%${level}%`);
    }

    if (title) {
      query += ' AND (title LIKE ? OR description LIKE ?)';
      queryParams.push(`%${title}%`, `%${title}%`);
    }

    
    const [rows] = await pool.query(query, queryParams);
    return rows as Exercise[];
  } catch (error) {
    console.error('Error fetching exercises by filters:', error);
    throw new Error('Failed to fetch exercises by filters.');
  }
}


export async function getUniqueFilters(): Promise<any> {
  const pool = await getPool();
  try {
    
    const [bodyParts] = await pool.query('SELECT DISTINCT bodyPart FROM Workouts;');
    const [equipments] = await pool.query('SELECT DISTINCT equipment FROM Workouts;');
    const [levels] = await pool.query('SELECT DISTINCT level FROM Workouts;');
    
    
    return {
      bodyPart: (bodyParts as any[]).map((item) => item.bodyPart),
      equipment: (equipments as any[]).map((item) => item.equipment),
      level: (levels as any[]).map((item) => item.level),
    };
  } catch (error) {
    console.error("Error fetching unique filter options:", error);
    throw new Error("Failed to fetch unique filter options.");
  }
}

export async function addExercise(exercise: Exercise): Promise<void> {
  const pool = await getPool();
  try {
    await pool.query(
      "INSERT INTO Workouts (title, description, bodyPart, equipment, level) VALUES (?, ?, ?, ?, ?, ?)",
      [exercise.title, exercise.description, exercise.bodyPart, exercise.equipment, exercise.level]
    );
  } catch (error) {
    console.error('Error adding exercise:', error);
    throw new Error('Failed to add exercise.');
  }
}

export async function deleteExercise(title: string): Promise<void> {
  const pool = await getPool();
  try {
    await pool.query('DELETE FROM Workouts WHERE title = ?;', [title]);
  } catch (error) {
    console.error('Error deleting exercise:', error);
    throw new Error('Failed to delete exercise.');
  }
}

export async function getMaxPlanId(userId: number) {
  const pool = await getPool();
  try {
    const result = await pool.query('SELECT MAX(planId) AS maxPlanId FROM UserWorkoutPlan');
    return result[0];
  } catch (error) {
    console.error('Error fetching exercise instances:', error);
    throw new Error('Failed to fetch exercise instances.');
  }
}

export async function getAllExerciseInstances(userId: number): Promise<ExerciseInstance[]> {
  const pool = await getPool();
  try {
    const [rows] = await pool.query('SELECT * FROM UserWorkoutPlan WHERE userId = ?;', [userId]);
    return rows as ExerciseInstance[];
  } catch (error) {
    console.error('Error fetching exercise instances:', error);
    throw new Error('Failed to fetch exercise instances.');
  }
}

export async function getExerciseInstanceByDate(userId: number, date: string): Promise<ExerciseInstance[]> {
  const pool = await getPool();
  try {
    const [rows] = await pool.query('SELECT * FROM UserWorkoutPlan WHERE userId = ? AND date = ?;', [userId, date]);
    return rows as ExerciseInstance[];
  } catch (error) {
    console.error('Error fetching exercise instance by date:', error);
    throw new Error('Failed to fetch exercise instance by date.');
  }
}

export async function addExerciseInstance(exerciseInstance: ExerciseInstance): Promise<void> {
  const pool = await getPool();
  
  try {
    await pool.query(
      "INSERT INTO UserWorkoutPlan (planId, userId, workoutPlan, date) VALUES (?, ?, ?, ?)",
      [exerciseInstance.planId, exerciseInstance.userId, exerciseInstance.workoutPlan, exerciseInstance.date]
    );
  } catch (error) {
    console.error('Error adding exercise instance:', error);
    throw new Error('Failed to add exercise instance.');
  }
}

export async function deleteExerciseInstance(userId: number, planId: number, date: string): Promise<void> {
  const pool = await getPool();
  try {
    console.log(`Deleting exercise instance with planId: ${planId}, userId: ${userId}, date: ${date}`);

    
    const todayPlan = await fetchTodayPlan(userId);
    console.log(`Fetched today's plan for userId: ${userId}:`, todayPlan);
    
    
    const exerciseToRemove = todayPlan.find(instance => instance.planId === planId);
    console.log(`Exercise to remove:`, exerciseToRemove);
    
    if (!exerciseToRemove) {
      console.error(`Exercise with planId ${planId} not found in today's plan for userId: ${userId}`);
      throw new Error('Exercise not found in today\'s plan.');
    }

    
    console.log(`Removing exercise with planId ${planId} from UserWorkoutPlan for userId: ${userId}`);
    await pool.query('DELETE FROM UserWorkoutPlan WHERE userId = ? AND planId = ? AND date = ?;', [userId, planId, date]);
    const updatedPlan = await fetchTodayPlan(userId);
    console.log(`Updated plan after deletion:`, updatedPlan);
    console.log(`Exercise with planId ${planId} successfully removed for userId: ${userId}`);
  } catch (error) {
    await pool.rollback(); 
    console.error('Error removing exercise from today\'s plan:', error);
    throw new Error('Failed to remove exercise from today\'s workout plan.');
  }
}


export async function fetchTodayPlan(userId: number): Promise<ExerciseInstance[]> {
  const pool = await getPool();
  const today = new Date().toISOString().split('T')[0];  
  try {
    console.log(`Fetching today's workout plan for userId: ${userId}, date: ${today}`);
    
    const [rows] = await pool.query('SELECT * FROM UserWorkoutPlan WHERE userId = ? AND date = ?;', [userId, today]);
    console.log(`Fetched rows for today:`, rows);
    
    return rows as ExerciseInstance[];
  } catch (error) {
    console.error('Error fetching today\'s plan:', error);
    throw new Error('Failed to fetch today\'s workout plan.');
  }
}

export async function logWorkoutPlanAndDiet(workoutPlanandDietDiary: WorkoutPlanAndDietDiary): Promise<void> {
  const pool = await getPool();
  try {
    await pool.query('CALL addWorkoutPlanAndDietEntry(?, ?, ?, ?, ?, ?)', 
      [workoutPlanandDietDiary.planId, workoutPlanandDietDiary.user_id, workoutPlanandDietDiary.workoutPlan, workoutPlanandDietDiary.foodName, workoutPlanandDietDiary.date_eaten, workoutPlanandDietDiary.date_eaten]);
    
    const [calorieResult] = await pool.query('CALL showTotalCalories(?)', [workoutPlanandDietDiary.user_id]);
    console.log('Total calories for user:', calorieResult);

    const [highestCalorieItems] = await pool.query('CALL highestCalorieItems(?)', [workoutPlanandDietDiary.user_id]);
    console.log('Highest calorie items for user:', highestCalorieItems);

    const [workoutPlanAndDietCount] = await pool.query('CALL workoutPlanAndDietCount(?)', [workoutPlanandDietDiary.user_id]);
    console.log('Number of workout plans and user diets:', workoutPlanAndDietCount);

  } catch (error) {
    console.error('Error logging workout plan and diet:', error);
    throw new Error('Could not log workout plan and diet.');
  }
}

export async function deleteWorkoutPlanAndDiet(planId: number, userId: number, workoutPlan: string, foodName: string, date: string): Promise<void> {
  const pool = await getPool();
  try {
    await pool.query('CALL deleteWorkoutPlanAndDietEntry(?, ?, ?, ?, ?)', [planId, userId, workoutPlan, foodName, date]);

    const [calorieResult] = await pool.query('CALL showTotalCalories(?)', [userId]);
    console.log('Total calories for user:', calorieResult);

    const [highestCalorieItems] = await pool.query('CALL highestCalorieItems(?)', [userId]);
    console.log('Highest calorie items for user:', highestCalorieItems);

    const [workoutPlanAndDietCount] = await pool.query('CALL workoutPlanAndDietCount(?)', [userId]);
    console.log('Number of workout plans and user diets:', workoutPlanAndDietCount);
  } catch (error) {
    console.error('Error deleting workout plan and diet:', error);
    throw new Error('Could not delete workout plan and diet.');
  }
}