import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();


const pool = mysql.createPool({
    host: "34.31.112.214", // Replace with process.env.DB_HOST for security
    user: "root",          // Replace with process.env.DB_USER for security
    password: "1234",      // Replace with process.env.DB_PASSWORD for security
    database: "eclipse", // Replace with your actual database name
});

// Test the connection
(async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database.');

        // Test query
        const [rows] = await connection.query('SELECT 1 + 1 AS result;');
        console.log('Test query result:', rows);

        connection.release(); // Release connection back to the pool
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error connecting to MySQL database:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
    }
})();

export default pool;
