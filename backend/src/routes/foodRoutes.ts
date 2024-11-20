import { Router, Request, Response } from "express";
import { getAllFood,getFoodbyName} from "../services/database";
import {Food} from '../models/food'


const router = Router();

router.get("/", async (req: Request, res: Response) => {
    // if there is no query parameter, return all Pokémon
    if (!req.query.search) {
      try {
        const allFood: Food[] = await getAllFood();
        res.status(200).json(allFood);
      } catch (error) {
        res.status(500).json({ message: "Error fetching food" });
      }
    } else {
      const query = req.query.search as string;
      try {
        const food = await getFoodbyName (query);
        res.status(200).json(food);
      } catch (error) {
        res.status(500).json({ message: "Error fetching food" });
      }
    }
  });


export default router;