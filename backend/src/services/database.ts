import { Food } from "../models/food";
import { dietDiary } from "../models/dietDiary";
import { getPool } from './connection';

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
