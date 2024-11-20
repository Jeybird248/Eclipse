import {Food} from "../models/food";
import {dietDairy} from "../models/dietDairy";
import {dietDairyData,FoodData} from "../../../data/mockData";
import pool from './connection';

const pd: Food[] = FoodData
const psd: dietDairy[] = dietDairyData

export async function getAllFood(): Promise<Food[]> {
  try {
    const [rows] = await pool.query('SELECT * from Food;'); // Replace "Food" with your actual table name
    // console.log('Fetched all food:', rows);
    return rows as Food[];
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching all food:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('Failed to fetch all food.');
  }
}

export async function getFoodbyName(foodName: string): Promise<Food[]> {
    const queryName = foodName.toLowerCase();
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(pd.filter(p => p.foodName.toLowerCase().includes(queryName)));
      }, 300);
    });
}

export async function getAllDietDiary(): Promise<dietDairy[]> {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(psd);
    //   }, 300);
    // });
    const [rows] = await pool.query('SELECT * FROM UserDiet;');
    // console.log("work");
    return rows as dietDairy[];  
}
  export async function getDietDairyByDate(date_eaten: string): Promise<dietDairy[]> {
    console.log(date_eaten)
    const sqlQuery = `SELECT * FROM UserDiet WHERE date_eaten =${date_eaten};`;
    const [rows] = await pool.query(sqlQuery);
    console.log("work")
    return rows as dietDairy[];
    // const [rows] = await pool.query('SELECT * from UserDiet WHERE date_eaten =${date_eaten}'); // Replace "Food" with your actual table name
    // console.log('Fetched all food:', rows);
    // return rows as dietDairy[];
  }
  
  
  // export async function getPokemonByID(pokemonID: number): Promise<Pokemon | undefined> {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(pd.find(p => p.pokemonID === pokemonID));
  //     }, 300);
  //   });
  // }
  
//   export async function getAllPokemonSpawns(): Promise<PokemonSpawn[]> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(psd);
//       }, 300);
//     });
//   }
  
//   export async function getPokemonSpawnBySpawnID(spawnID: number): Promise<PokemonSpawn | undefined> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(psd.find(p => p.spawnID === spawnID));
//       }, 300);
//     });
//   }
  
//   export async function getPokemonSpawnByPokemonID(pokemonID: number): Promise<PokemonSpawn[]> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(psd.filter(p => p.num === pokemonID));
//       }, 300);
//     });
//   }
  
//   export async function addPokemonSpawn(spawn: Omit<PokemonSpawn, 'spawnID'>): Promise<void> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const maxSpawnID = psd.length > 0 ? Math.max(...psd.map(p => p.spawnID)) : 0;
//         const newSpawn: PokemonSpawn = {
//           spawnID: maxSpawnID + 1,
//           ...spawn,
//         };
//         psd.push(newSpawn);
//         resolve();
//       }, 300);
//     });
//   }
  
//   export async function updatePokemonSpawn(spawn: PokemonSpawn): Promise<void> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const index = psd.findIndex(p => p.spawnID === spawn.spawnID);
//         if (index >= 0) {
//           psd[index] = spawn;
//         }
//         resolve();
//       }, 300);
//     });
//   }
  
//   export async function deletePokemonSpawnbyID(spawnID: number): Promise<void> {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const index = psd.findIndex(p => p.spawnID === spawnID);
//         if (index >= 0) {
//           psd.splice(index, 1);
//         }
//         resolve();
//       }, 300);
//     });
//   }