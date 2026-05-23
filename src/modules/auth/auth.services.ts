import { pool } from "../../db";
import { ragex } from "../../helpers/ragex";
import type { Iuser } from "./auth.interface";

// -------signup user
const signupInDB = async (payload: Iuser) => {
  const { name, email, password, role } = payload;

    //   validation
    if (!name) {throw new Error("Name is required");}
    if (!email) {throw new Error("Email is required");}
    if (!ragex.isValidateEmail(email)){ throw new Error("Email not valid");}
    if (!password) {throw new Error("password is required");}
    if (!ragex.isValidatePassword(password)) {throw new Error("password not valid");}
    if (!role) {throw new Error("Role is required");}
    if (role !== "contributor" && role !== "maintainer") {
      throw new Error("Invalid role! Role must be contributor or maintainer");
    }

    // creating user
    const result = await pool.query(
      `
        INSERT INTO users(name, email, password, role) VALUES($1,$2,$3, COALESCE($4, 'contributor')) RETURNING *

        `,
      [name, email, password, role],
    );

    delete result.rows[0].password;

    return result;
};

export const authService = { signupInDB };
