// const express = require('express');
// const router = express.Router();

// // Dummy user data
// const users = [
//     { username: 'zYCmQvHi', email: 'zyc@email.com', password: 'ew:|F3"%H=(' },
//     { username: 'dummy', email: 'dummy@email.com', password: 'dummy123' },
//     { username: 'mSMvyuLU', email: 'msm@email.com', password: '&\\({r{76[EZl' },
//     { username: 'ybNwKCLK', email: 'ybn@email.com', password: 'lK6,K5&Um=]p' },
//     { username: 'uHxiLkAh', email: 'uhx@email.com', password: '4#c69[Op}lSs' },
//     { username: 'diolHzAm', email: 'dio@email.com', password: 'cGp1LS<1X%FU' },
//     { username: 'KjipmvBI', email: 'kji@email.com', password: "'f4\\mpqMBV?@" },
//     { username: 'UxjkqwTV', email: 'uxj@email.com', password: 'ewBRIe_04P"H' },
//     { username: 'EOxzLlJl', email: 'eox@email.com', password: '<~|!uVSK%Zkt' },
//     { username: 'gHWsaCjV', email: 'ghw@email.com', password: "j&['D*i2}f}u" },
//     { username: 'hdzeNUPc', email: 'hdz@email.com', password: 'm%BG#sRTa-M5' },
//     { username: 'owhsXQTy', email: 'owh@email.com', password: 'J%ppIVBan4<g' },
//     { username: 'AYDPRzPR', email: 'ayd@email.com', password: 'YTt^1{R7*SFd' },
//     { username: 'zaOwKpDm', email: 'zao@email.com', password: '_"@HJ}4fOu"<' },
//     { username: 'RuRtWTDm', email: 'rur@email.com', password: 'q_G"jM@GZ&ph' },
//     { username: 'AHJBmdaa', email: 'ahj@email.com', password: "]2RwP)r>G'/A" },
//     { username: 'dnBvZPDW', email: 'dnb@email.com', password: '!G*\\q{(@{um;' },
//     { username: 'jcLcTBYo', email: 'jcl@email.com', password: '@afTJ}x{I$YX' },
//     { username: 'rugEmFtY', email: 'rug@email.com', password: '5F!$#79jQt`k' },
//     { username: 'cooBdKya', email: 'coo@email.com', password: '@:UVsH3lNw]Q' }
// ];

// // Login Route
// router.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     // Log the incoming request data
//     console.log(`Login attempt: Email = ${email}, Password = ${password}`);

//     // Find the user
//     const user = users.find(u => u.email === email && u.password === password);

//     if (user) {
//         console.log(`Login successful for user: ${user.username}`);
//         res.status(200).json({ message: 'Login successful!', user: user.username });
//     } else {
//         console.log(`Login failed: Invalid email or password`);
//         res.status(401).json({ message: 'Invalid email or password' });
//     }
// });

// module.exports = router;

import express from 'express';
import pool from '../database/connection.js';

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Log the received username and password for debugging
    console.log('Received username:', username);
    console.log('Received password:', password);

    try {
        const [rows] = await pool.query('SELECT * FROM User WHERE username = ? AND password = ?', [username, password]);

        if (rows.length > 0) {
            res.status(200).json({ message: 'Login successful!', username: rows[0].username });
        } else {
            res.status(401).json({ message: 'Invalid user ID or password' });
        }
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ message: 'An error occurred.' });
    }
});

export default router;
