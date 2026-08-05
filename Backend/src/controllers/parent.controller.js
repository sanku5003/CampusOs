const pool = require("../db/db");

const getSchoolId = async (req) => {
  const school = await pool.query(
    `SELECT school_id FROM school WHERE school_id=$1`,
    [req.user.id],
  );

  if (school.rows.length === 0) {
    throw new Error("School not found");
  }

  return school.rows[0].school_id;
};

const isStudentIdValid = async (school_id, student_id) => {
  const student = await pool.query(
    `SELECT student_id FROM student WHERE student_id=$1 AND school_id=$2`,
    [student_id, school_id],
  );

  if (student.rows.length === 0) {
    return false;
  }

  return true;
};

const addParentController = async (req, res) => {
  const {
    parent_name,
    relation,
    email,
    contact,
    education,
    profession,
    student_id,
  } = req.body;

  if (
    !parent_name ||
    !relation ||
    !email ||
    !contact ||
    !education ||
    !profession ||
    !student_id
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const insertQuery = `INSERT INTO parent ( parent_name,
    relation,
    email,
    contact,
    education,
    profession,
    student_id) 
    VALUES 
    ($1 ,$2 ,$3 ,$4 ,$5 ,$6 ,$7) 
    RETURNING parent_id , parent_name`;

    const result = await pool.query(insertQuery, [
      parent_name,
      relation,
      email,
      contact,
      education,
      profession,
      student_id,
    ]);

    const parent = result.rows[0];

    return res.status(201).json({
      message: "parent registered successfully",
      parent,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const viewParentController = async (req, res) => {
  try {
    const schoolId = await getSchoolId(req);
    const { student_id } = req.params;
    const isStudentExist = await isStudentIdValid(schoolId, student_id);
    if (isStudentExist === false) {
      return res.status(404).json({
        message: "student not found",
      });
    }

    const result = await pool.query(
      `SELECT * FROM parent WHERE student_id=$1`,
      [student_id],
    );

    return res.status(200).json({
      parent: result.rows[0],
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



module.exports = { addParentController, viewParentController };
