/* eslint-disable no-undef */
import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const { Pool } = pkg;

// Validate required environment variables
const requiredEnvVariables = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
requiredEnvVariables.forEach((varName) =>{
  if(!process.env[varName]){
    throw new Error(`Environment variable ${varName} is required but not set.`);
  }
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});

// Check the data base connection
pool.connect((err, client, release) => {
  if(err){
    console.error('Erro connecting to the database: ', err.stack);
  }else{
    console.log('Connected to the database');
    release();
  }
});

export default pool;