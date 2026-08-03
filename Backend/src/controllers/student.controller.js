const pool = require("../db/db");

const AddStudentController = async (req, res) => {
  const {
    student_name,
    class_val,
    sec,
    gender,
    reg_no,
    fullAddress,
    city,
    state_living,
    pincode,
    email,
    contact,
    admission_date,
    roll_no,
    dob,
  } = req.body;

  if (
    !student_name ||
    !class_val ||
    !sec ||
    !gender ||
    !reg_no ||
    !fullAddress ||
    !city ||
    !state_living ||
    !pincode ||
    !email ||
    !contact ||
    !admission_date ||
    !roll_no ||
    !dob
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const school = await pool.query(`SELECT * FROM school WHERE school_id=$1`, [
    req.user.id,
  ]);

  const school_id = school.rows[0].school_id;

  const class_data = await pool.query(
    `SELECT * FROM class WHERE class=$1 AND section=$2 AND school_id=$3`,
    [class_val, sec, school_id],
  );

  const isEmailExist = await pool.query(
    `SELECT * FROM student WHERE email=$1 AND school_id=$2`,
    [email, school_id],
  );
  if (isEmailExist.rows.length > 0) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const isRegNoExist = await pool.query(
    `SELECT * FROM student WHERE reg_no=$1 AND school_id=$2`,
    [reg_no, school_id],
  );
  if (isRegNoExist.rows.length > 0) {
    return res.status(400).json({ message: "Registration No already exist" });
  }

  const isRollNoExist = await pool.query(
    `SELECT * FROM student WHERE reg_no=$1`,
    [roll_no],
  );
  if (isRollNoExist.rows.length > 0) {
    return res.status(400).json({ message: "Roll No already exist" });
  }

  const class_id = class_data.rows[0].class_id;


  const insertQuery = `
    INSERT INTO student (student_name,
    class_id,
    gender,
    reg_no,
    fullAddress,
    city,
    state_living,
    pincode,
    email,
    contact,
    admission_date,
    roll_no,
    school_id,
    dob)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11 ,$12 ,$13 , $14)
    RETURNING school_id, student_name , class_id , email, contact
  `;

  const result = await pool.query(insertQuery, [
    student_name,
    class_id,
    gender,
    reg_no,
    fullAddress,
    city,
    state_living,
    pincode,
    email,
    contact,
    admission_date,
    roll_no,
    school_id,
    dob,
  ]);

  const student = result.rows[0];

  return res.status(201).json({
    message: "student registered successfully",
    student,
  });
};

module.exports = { AddStudentController };
