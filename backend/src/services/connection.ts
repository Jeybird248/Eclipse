import mysql, { Pool } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { Connector, IpAddressTypes } from '@google-cloud/cloud-sql-connector';

dotenv.config();

const connector = new Connector();
let pool: Pool | null = null;

export async function getPool(): Promise<Pool> {
    if (pool) return pool;

    try {
        const clientOpts = await connector.getOptions({
            instanceConnectionName: 'ecplise:us-central1:db-fa24',
            ipType: IpAddressTypes.PUBLIC,
        });

        pool = mysql.createPool({
            ...clientOpts,
            user: "root",          
            password: "1234",      
            database: "eclipse",   
        });

        console.log('MySQL pool initialized successfully.');

        await testConnection(pool);
        return pool;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error initializing MySQL pool:', error.message);
        } else {
            console.error('Unknown error occurred:', error);
        }
        throw new Error('Failed to initialize MySQL pool.');
    }
}

async function testConnection(pool: Pool) {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database.');

        const [rows] = await connection.query('SELECT 1 + 1 AS result;');
        console.log('Test query result:', rows);

        connection.release();
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error connecting to MySQL database:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        throw new Error('Test connection to MySQL database failed.');
    }
}




















































