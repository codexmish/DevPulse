import { Pool } from "pg";
import config from "../config/consfig";

const pool = new Pool({
  connectionString: config.connection_String,
});

export const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('admin', 'user', 'moderator')),

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
            
            `);

    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
