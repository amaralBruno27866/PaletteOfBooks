/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config();

const { Pool } = pkg;

// Validate required environment variables
const requiredEnvVariables = ['DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT', 'DB_DATABASE'];
requiredEnvVariables.forEach((varName) =>{
  if(!process.env[varName]){
    throw new Error(`Missing required enviroment variable: ${varName}`);
  }
});

const pool = new Pool({
  hots: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl:{
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