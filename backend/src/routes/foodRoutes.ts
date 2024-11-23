import { Router, Request, Response } from "express";
import { getAllFood, getFoodByName, addFood } from "../services/database";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const search = req.query.search as string;
  try {
    if (search) {
      const food = await getFoodByName(search);
      res.status(200).json(food);
    } else {
      const allFood = await getAllFood();
      res.status(200).json(allFood);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching food data", error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    await addFood(req.body);
    res.status(201).json({ message: "Food added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding food", error });
  }
});

export default router;
