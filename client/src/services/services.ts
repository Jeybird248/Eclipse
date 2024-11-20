import { dietDairyData, FoodData } from "./mockData";

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

export interface dietDairy {
  user_id:number;
  foodName:string;
  date_eaten:string;
}




export const searchFoodData = (query: string): Promise<Food[]> => {
    return httpClient
      .get(`/food`, {
        params: { search: query },
      })
      .then((response) => response.data);
  };

  // export const searchDietDairyData = (query: string): Promise<dietDairy[]> => {
  //   return httpClient
  //     .get(`/dietDiary/${encodeURIComponent(query)}`)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       console.error(`Error fetching diet dairy data for ${query}:`, error);
  //       throw error;
  //     });
  export const searchDietDairyData = async (query: string): Promise<dietDairy[]> => {
    try {
      // Add quotes around the date
      const formattedQuery = `"${query}"`; // Add quotes around the query
      const response = await httpClient.get('/dietDairy/${encodeURIComponent(formattedQuery)}');
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