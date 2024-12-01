
import { Router, Request, Response } from "express";
import { getMaxPlanId, getAllExerciseInstances, getExerciseInstanceByDate, addExerciseInstance, deleteExerciseInstance } from "../services/database";

const router = Router();


router.get("/getExercise/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const exerciseInstances = await getAllExerciseInstances(Number(userId));
    res.status(200).json(exerciseInstances);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercise instances" });
  }
});


router.get("/getExercise/:userId/:date", async (req: Request, res: Response) => {
  const { userId, date } = req.params;
  console.log("Fetching exercise instances for:", { userId, date }); 
  
  try {
    const exerciseInstance = await getExerciseInstanceByDate(Number(userId), date);
    console.log("Fetched Exercise Instances:", exerciseInstance); 
    res.status(200).json(exerciseInstance);
  } catch (error) {
    console.error("Error in GET /:userId/:date:", error); 
    res.status(500).json({ message: "Error fetching exercise instance by date", error });
  }
});



router.post("/", async (req: Request, res: Response) => {
  const { planId, userId, workoutPlan, date } = req.body;
  console.log("Adding new exercise instance:", { planId, userId, workoutPlan, date }); 
  
  try {
    await addExerciseInstance({ planId, userId, workoutPlan, date });
    console.log("Successfully added exercise instance"); 
    res.status(201).json({ message: "Exercise instance added successfully" });
  } catch (error) {
    console.error("Error in POST /:", error); 
    res.status(500).json({ message: "Error adding exercise instance", error });
  }
});


router.get('/getMaxPlanId/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const maxPlanId = await getMaxPlanId(Number(userId));
    res.status(200).json(maxPlanId)
  } catch (error) {
    console.error('Error fetching max planId:', error);
    res.status(500).json({ message: 'Error fetching max planId' });
  }
});



router.delete("/getExercise/:userId/:planId/:date", async (req: Request, res: Response) => {
  const { userId, planId, date } = req.params;
  console.log("calling deleteexerciseinstance with", userId, planId, date);
  try {
    await deleteExerciseInstance(Number(userId), Number(planId), date);
    res.status(200).json({ message: "Exercise instance deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting exercise instance", error });
  }
});

export default router;
