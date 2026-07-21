const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const {
    schoolName,
    fullAddress,
    city,
    State_living,
    pincode,
    udiseCode,
    principal,
    email,
    contact,
    passcode,
  } = req.body;

  if (
    !schoolName ||
    !fullAddress ||
    !city ||
    !State_living ||
    !pincode ||
    !udiseCode ||
    !principal ||
    !email ||
    !contact ||
    !passcode
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (passcode.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
    });
  }

  const isEmailExist = await pool.query(`SELECT * FROM school WHERE email=$1`, [
    email,
  ]);
  if (isEmailExist.rows.length > 0) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const isudiseExist = await pool.query(
    `SELECT * FROM school WHERE udiseCode=$1`,
    [udiseCode],
  );
  if (isudiseExist.rows.length > 0) {
    return res.status(400).json({ message: "School already registered" });
  }

  const isContactExist = await pool.query(
    `SELECT * FROM school WHERE contact=$1`,
    [contact],
  );
  if (isContactExist.rows.length > 0) {
    return res.status(400).json({ message: "Contact already registered" });
  }

  const hash = await bcrypt.hash(passcode, 10);

  const insertQuery = `
    INSERT INTO school (schoolName, fullAddress, city, State_living, pincode, udiseCode, principal, email, contact, passcode)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING school_id, schoolName, email, contact
  `;

  const result = await pool.query(insertQuery, [
    schoolName,
    fullAddress,
    city,
    State_living,
    pincode,
    udiseCode,
    principal,
    email,
    contact,
    hash,
  ]);

  const user = result.rows[0];
  const token = jwt.sign(
    { id: user.school_id, user: user.email },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "School registered successfully",
    user: {
      id: user.school_id,
      schoolName: user.schoolName,
      email: user.email,
      contact: user.contact,
      token,
    },
  });
};

const loginController = async (req, res) => {
  const { email, passcode } = req.body;

  const result = await pool.query(`SELECT * FROM school WHERE email=$1`, [
    email,
  ]);

  const user = result.rows[0];
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(passcode, user.passcode);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { id: user.school_id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "24h" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Login successful",
    user: {
      id: user.school_id,
      email: user.email,
      token,
    },
  });
};

const logoutController = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({
      message: "No token found",
    });
  }

  const decoded = jwt.verify(
    token,
    process.env.SECRET_KEY || "your_jwt_secret",
  );

  await pool.query(
    `INSERT INTO blacklisted_tokens(token, user_id, expires_at)
    VALUES ($1, $2, to_timestamp($3))`,
    [token, decoded.id, decoded.exp],
  );

  res.clearCookie("token");

  return res.status(200).json({
    message: "Logout successful",
  });
};

const profileController = async (req, res) => {
  const user = await pool.query(`SELECT * FROM school WHERE school_id=$1`, [
    req.user.id,
  ]);

  console.log(req.user);
  res.status(200).json({
    message: "User fetched successfully",
    user : user.rows[0]
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  profileController,
};
