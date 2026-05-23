import { Pool } from "pg";
import config from "../config/consfig";

export const pool = new Pool({
  connectionString: config.connection_String,
});

export const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        email VARCHAR(40) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('contributor', 'maintainer')),

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
            
            `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS issues (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(500) NOT NULL,
        type VARCHAR(20) DEFAULT 'bug' CHECK (type IN ('bug', 'feature_request')),
        status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'closed')),
        reporter_id VARCHAR(10),

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
            
            `);

    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
