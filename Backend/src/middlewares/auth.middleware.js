const jwt = require("jsonwebtoken");
const pool = require("../db/db");
const bcrypt = require("bcrypt");

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isTokenBlackListed = await pool.query(
    `SELECT * FROM blacklisted_tokens WHERE token=$1` ,
    [token]
  )

  if(isTokenBlackListed.rows.length > 0){
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authUser ;
