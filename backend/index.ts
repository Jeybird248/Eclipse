import express, { Request, Response } from 'express';
import foodRoutes from './src/routes/foodRoutes';
import dietDairyRoutes from './src/routes/dietDairyRoutes';
import authRoutes from './src/routes/auth';
import cors from 'cors';


const app = express();
const PORT = 3007;

app.use(cors());
app.use(express.json());

app.get('/api/', (req:Request, res:Response) => {
    res.send('Homepage of eclipse.');
});


app.use("/api/food", foodRoutes);
app.use("/api/dietDairy", dietDairyRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
