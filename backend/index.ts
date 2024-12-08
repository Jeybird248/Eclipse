import express, { Request, Response } from 'express';
import foodRoutes from './src/routes/foodRoutes';
import dietDiaryRoutes from './src/routes/dietDiaryRoutes';
import authRoutes from './src/routes/auth';
import workoutRoutes from './src/routes/workoutRoutes';
import workoutInstanceRoutes from './src/routes/workoutInstanceRoutes';
import workoutAndDietRoutes from './src/routes/workoutAndDietRoutes';

import cors from 'cors';


const app = express();
const PORT = 3007;

app.use(cors());
app.use(express.json());

app.get('/api/', (req:Request, res:Response) => {
    res.send('Homepage of eclipse.');
});


app.use("/api/food", foodRoutes);
app.use("/api/diet-diary", dietDiaryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/workout', workoutRoutes)
app.use('/api/workoutInstance', workoutInstanceRoutes)
app.use('/api/workoutAndDiet', workoutAndDietRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
