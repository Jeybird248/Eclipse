import { Router, Request, Response } from "express";
import { deleteWorkoutPlanAndDiet, logWorkoutPlanAndDiet, getDietDiaryByDate, getMaxPlanId } from "../services/database";

const router = Router();

router.get("/dietDiary/:userId/:date", async (req: Request, res: Response) => {
    const { userId, date } = req.params;
    try {
        console.log("diary route userId:", userId);
        console.log("diary route date:", date);
        const dietDiary = await getDietDiaryByDate(Number(userId), date);
        res.status(200).json(dietDiary);
    } catch (error) {
        res.status(500).json({ message: "Error fetching diet diary entry" });
    }
  });

router.post("/", async (req: Request, res: Response) => {
    const { planId, user_id, workoutPlan, foodName, date_eaten } = req.body;
    console.log("Adding new workout plan and diet instance:", { planId, user_id, workoutPlan, foodName, date_eaten }); 

    try {
        await logWorkoutPlanAndDiet({ planId, user_id, workoutPlan, foodName, date_eaten });
        console.log("Successfully added workout plan and food instance"); 
        res.status(200).json({ message: "Workout plan and food instance added successfully" });
    } catch (error) {
        console.error("Error in POST /:", error);
        res.status(500).json({ message: "Error adding food and workout plan data", error });
    }
});

// router.get('/getMaxPlanId/:userId', async (req, res) => {
//     try {
//       const { userId } = req.params;
//       const maxPlanId = await getMaxPlanId(Number(userId));
//       res.status(200).json(maxPlanId)
//     } catch (error) {
//       console.error('Error fetching max workout planId:', error);
//       res.status(500).json({ message: 'Error fetching max workout planId' });
//     }
//   });

router.delete("/getWorkoutPlan/:planId/:userId/:workoutPlan/:foodName/:date", async (req: Request, res: Response) => {
    const { planId, userId, workoutPlan, foodName, date } = req.params;
    console.log("calling deleteworkoutplananddiet with", planId, userId, workoutPlan, foodName, date);
    try {
      await deleteWorkoutPlanAndDiet(Number(planId), Number(userId), workoutPlan, foodName, date);
      res.status(200).json({ message: "Workout plan and diet deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting food and workout plan data", error });
    }
  });

export default router;