import { dietDiaryData, FoodData, workoutData } from "./mockData";

import axios from "axios";

const BASE_URL = 'http://localhost:3007/api' ;
export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Food {
    foodName:string;
    measure:string;
    grams:number;
    calories:number;
    protein:number;
}

export interface dietDiary {
  user_id:number;
  foodName:string;
  date_eaten:string;
}

export interface Workouts {
  title: string;
  description: string;
  exerciseType: string;
  bodyPart: string;
  equipment: string;
  level: string;
}

export const searchFoodData = (query: string): Promise<Food[]> => {
    return httpClient
      .get(`/food`, {
        params: { search: query },
      })
      .then((response) => response.data);
  };

  // export const searchDietDiaryData = (query: string): Promise<dietDiary[]> => {
  //   return httpClient
  //     .get(`/dietDiary/${encodeURIComponent(query)}`)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       console.error(`Error fetching diet dairy data for ${query}:`, error);
  //       throw error;
  //     });
  export const searchDietDiaryData = async (query: string): Promise<dietDiary[]> => {
    try {
      // Add quotes around the date
      const formattedQuery = `"${query}"`; // Add quotes around the query
      const response = await httpClient.get('/dietDiary/${encodeURIComponent(formattedQuery)}');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.warn('No data found for date: ${query}');
        return []; // Return an empty array for 404
      }
      console.error(`Error fetching diet dairy data for ${query}:`, error);
      throw error;
    }
  };

  // export const searchWorkoutData = async (query: string): Promise<Workouts[]> => { 
  //   try {

  //   } catch (error: any) {
  //     console.error('Error fetching exercise data');
  //   }
  // };