import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: '34.31.112.214',
    user: 'root',
    password: '1234',
    database: 'eclipse',
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
        console.error('Error connecting to MySQL database:', error.message);
    }
})();

export default pool;

