import express from 'express';
import { getPool } from '../services/connection';
import { RowDataPacket } from 'mysql2';

const router = express.Router();

interface User {
    user_id: number;
    username: string;
    password: string;
}

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    
    console.log('Received username:', username);
    console.log('Received password:', password);

    const pool = await getPool();
    try {
        
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM User WHERE username = ? AND password = ?', [username, password]);
        
        const users: User[] = rows as User[];

        if (users.length > 0) {
            res.status(200).json({ message: 'Login successful!', username: users[0].username });
        } else {
            res.status(401).json({ message: 'Invalid user ID or password' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'An error occurred.' });
    }
});

export default router;
