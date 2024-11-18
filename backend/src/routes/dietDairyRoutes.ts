import { Router, Request, Response } from "express";
import { getAllDietDiary, getDietDairyByDate } from "../services/database";
import { dietDairy} from "../models/dietDairy";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allDietDiary: dietDairy[] = await getAllDietDiary();
    res.status(200).json(allDietDiary);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Pokémon spawns" });
  }
});

router.get("/:date", async (req: Request, res: Response) => {
  const date_eaten = req.params.date;
  try {
    const dietDairy= await getDietDairyByDate(date_eaten);
    if (dietDairy) {
      res.status(200).json(dietDairy);
    } else {
      res.status(404).json({ message: `No dietDairy found with date ${date_eaten}` });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching Pokémon spawn" });
  }
});

// router.get("/pokemon/:id", async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   try {
//     const pokemonSpawns = await getPokemonSpawnByPokemonID(id);
//     res.status(200).json(pokemonSpawns);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching Pokémon spawns" });
//   }
// });


// router.post("/", async (req: Request, res: Response) => {
//   const newSpawn: Omit<PokemonSpawn, 'spawnID'> = req.body;  // Do not expect spawnID in the request body
//   try {
//     const spawn = await addPokemonSpawn(newSpawn);
//     res.status(201).json(spawn);
//   } catch (error) {
//     res.status(500).json({ message: "Error adding Pokémon spawn" });
//   }
// });


// router.put("/:id", async (req: Request, res: Response) => {
//   const updatedSpawn: PokemonSpawn = req.body;
//   try {
//     await updatePokemonSpawn(updatedSpawn);
//     res.status(204).end();
//   } catch (error) {
//     res.status(500).json({ message: "Error updating Pokémon spawn" });
//   }
// });

// router.delete("/:id", async (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   try {
//     await deletePokemonSpawnbyID(id);
//     res.status(204).end();
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting Pokémon spawn" });
//   }
// });

export default router;