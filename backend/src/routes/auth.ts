import express from 'express';
import { getPool } from '../services/connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2'; // Import ResultSetHeader for query result

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
        // Query for the user with the provided username and password
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM User WHERE username = ? AND password = ?',
            [username, password]
        );

        const users: User[] = rows as User[];

        if (users.length > 0) {
            res.status(200).json({ message: 'Login successful!', username: users[0].username });
        } else {
            res.status(401).json({ message: 'Invalid username or password.' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    console.log('Received username for signup:', username);
    if (!username || !password) {
        res.status(400).json({ message: 'Username and password are required.' });
    }

    const pool = await getPool();
    try {
        const [existingUsers] = await pool.query<RowDataPacket[]>(
            'SELECT user_id FROM User WHERE username = ?',
            [username]
        );

        if (existingUsers.length > 0) {
            res.status(409).json({ message: 'Username already exists. Please choose another one.' });
        }

        const [maxIdRow] = await pool.query<RowDataPacket[]>(
            'SELECT MAX(user_id) AS maxId FROM User'
        );
        const nextId = (maxIdRow[0]?.maxId || 0) + 1;

        const [result] = await pool.query<ResultSetHeader>(
            'INSERT INTO User (user_id, username, password) VALUES (?, ?, ?)',
            [nextId, username, password]
        );

        if (result.affectedRows === 1) {
            res.status(201).json({ message: 'User registered successfully!' });
        } else {
            throw new Error('Failed to insert user.');
        }
    } catch (error) {
        console.error('Database error during signup:', error);
        res.status(500).json({ message: 'An error occurred while creating the account.' });
    }
});

export default router;
