import config from "../../config/consfig";
import { pool } from "../../db";
import { ragex } from "../../helpers/ragex";
import type { Iuser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// -------signup user
const signupInDB = async (payload: Iuser) => {
  const { name, email, password, role } = payload;

  //   validation
  if (!name) {
    throw new Error("Name is required");
  }
  if (!email) {
    throw new Error("Email is required");
  }
  if (!ragex.isValidateEmail(email)) {
    throw new Error("Email not valid");
  }
  if (!password) {
    throw new Error("password is required");
  }
  if (!ragex.isValidatePassword(password)) {
    throw new Error("password not valid");
  }
  if (!role) {
    throw new Error("Role is required");
  }
  if (role !== "contributor" && role !== "maintainer") {
    throw new Error("Invalid role! Role must be contributor or maintainer");
  }

  // checking if user already exist
  const existEmail = await pool.query(
    `
      SELECT id FROM users WHERE email=$1
      `,
    [email],
  );

  console.log(existEmail);

  if (existEmail.rowCount === 1) {
    throw new Error("This email is already registered. Please log in.");
  }

  // password hash
  const hashPassword = await bcrypt.hash(password, 10);

  // creating user
  const result = await pool.query(
    `
        INSERT INTO users(name, email, password, role) VALUES($1,$2,$3, COALESCE($4, 'contributor')) RETURNING *
       `,
    [name, email, hashPassword, role],
  );

  delete result.rows[0].password;

  return result;
};

// -------login user
const loginInDB = async (payload: Iuser) => {
  const { email, password } = payload;

  // validation
  if (!email) {
    throw new Error("Email is required");
  }
  if (!ragex.isValidateEmail(email)) {
    throw new Error("Email not valid");
  }
  if (!password) {
    throw new Error("password is required");
  }
  if (!ragex.isValidatePassword(password)) {
    throw new Error("password not valid");
  }

  //   check if user exist
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("INVALD CREDENTIALS");
  }

  const user = userData.rows[0];

  // passwordCheck
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("INVALD CREDENTIALS");
  }

  delete user.password;

  //   JWT toke genarate
  const jwtPatload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  console.log(jwtPatload);

  const accessToken = jwt.sign(jwtPatload, config.JWT_SEC, { expiresIn: "1d" });

  const RefreshToken = jwt.sign(jwtPatload, config.JWT_SEC, {
    expiresIn: "30d",
  });
  console.log(accessToken);

  return { accessToken, RefreshToken, user };
};

export const authService = { signupInDB, loginInDB };
