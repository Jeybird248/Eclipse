import { Router, Request, Response } from "express";
import {
  getAllExercises,
  getExercisesByFilters,
  addExercise,
  deleteExercise,
  getUniqueFilters,
} from "../services/database";

const router = Router();

/**
 * GET all exercises or filtered exercises based on query parameters.
 */
router.post("/", async (req: Request, res: Response) => {
  const { bodyPart, equipment, level, title } = req.body;

  try {
    
    const exercises = await getExercisesByFilters({
      bodyPart,
      equipment,
      level,
      title,  
    });
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercises", error });
  }
});

router.get("/filters", async (req: Request, res: Response) => {
  try {
    
    const uniqueFilters = await getUniqueFilters();
    
    
    res.status(200).json(uniqueFilters);
  } catch (error) {
    console.error("Error fetching unique filters:", error);
    res.status(500).json({ message: "Failed to fetch unique filters" });
  }
});

export default router;
