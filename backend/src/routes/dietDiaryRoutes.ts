import { Router, Request, Response } from "express";
import { getAllDietDiary, getDietDiaryByDate, addDietDiaryEntry, deleteDietDiaryEntry, getFoodByName } from "../services/database";

const router = Router();

router.get("/:userId/:date", async (req: Request, res: Response) => {
  const { userId, date } = req.params;
  try {
    console.log("diary route userId:", userId);
    console.log("diary route date:", date);
    const dietDiary = await getDietDiaryByDate(Number(userId), date);
    const foodDetails = await Promise.all(
      dietDiary.map(async (entry) => {
        const foodInfo = await getFoodByName(entry.foodName);
        return { ...entry, ...foodInfo[0] };
      })
    );
    res.status(200).json(foodDetails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching diet diary entry" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { userId, foodName, date } = req.body;
  try {
    await addDietDiaryEntry(Number(userId), foodName, date);
    res.status(201).json({ message: "Diet diary entry added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding diet diary entry", error });
  }
});

router.delete("/:userId/:date/:foodName", async (req: Request, res: Response) => {
  const { userId, date, foodName } = req.params;
  try {
    await deleteDietDiaryEntry(Number(userId), foodName, date);
    res.status(200).json({ message: "Diet diary entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing diet diary entry", error });
  }
});

export default router;
