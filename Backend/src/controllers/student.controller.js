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

const getClassId = async (school_id, class_val, sec) => {
  const class_data = await pool.query(
    `SELECT class_id FROM class WHERE class=$1 AND section=$2 AND school_id=$3`,
    [class_val, sec, school_id],
  );

  if (class_data.rows.length === 0) {
    throw new Error("Class not found");
  }

  return class_data.rows[0].class_id;
};

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
    addmission_date,
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
    !(admission_date || addmission_date) ||
    !roll_no ||
    !dob
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const school_id = await getSchoolId(req);
    const class_id = await getClassId(school_id, class_val, sec);

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
      `SELECT * FROM student WHERE roll_no=$1 AND school_id=$2`,
      [roll_no, school_id],
    );
    if (isRollNoExist.rows.length > 0) {
      return res.status(400).json({ message: "Roll No already exist" });
    }

    const insertQuery = `
      INSERT INTO student (
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
        dob
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING student_id, student_name, class_id, email, contact
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
      admission_date || addmission_date,
      roll_no,
      school_id,
      dob,
    ]);

    const student = result.rows[0];

    return res.status(201).json({
      message: "student registered successfully",
      student,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// const ViewStudentsController = async (req, res) => {
//   try {
//     const school_id = await getSchoolId(req);

//     const { class_id: classIdQuery, class_val, sec, search } = req.query;

//     let class_id = null;
//     if (classIdQuery) {
//       class_id = classIdQuery;
//     } else if (class_val || sec) {
//       const classRes = await pool.query(
//         `SELECT class_id FROM class WHERE class=$1 AND section=$2 AND school_id=$3`,
//         [class_val, sec, school_id],
//       );

//       if (classRes.rows.length === 0) {
//         return res.status(200).json({
//           message: "Students fetched successfully",
//           students: [],
//         });
//       }

//       class_id = classRes.rows[0].class_id;
//     }

//     const values = [school_id];
//     const whereClauses = ["s.school_id=$1"];
//     let idx = 2;

//     if (class_id) {
//       whereClauses.push(`s.class_id=$${idx}`);
//       values.push(class_id);
//       idx += 1;
//     }

//     if (search) {
//       const pattern = `%${search}%`;
//       whereClauses.push(
//         `(s.student_name ILIKE $${idx} OR s.reg_no ILIKE $${idx} OR s.email ILIKE $${idx} OR s.contact ILIKE $${idx})`,
//       );
//       values.push(pattern);
//       idx += 1;
//     }

//     const query = `
//       SELECT s.*, c.class AS class_val, c.section
//       FROM student s
//       LEFT JOIN class c ON s.class_id = c.class_id
//       WHERE ${whereClauses.join(" AND ")}
//       ORDER BY s.student_name ASC
//     `;

//     const result = await pool.query(query, values);

//     return res.status(200).json({
//       message: "Students fetched successfully",
//       students: result.rows,
//     });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

const ViewStudentsController = async (req, res) => {
  try {
    const school_id = await getSchoolId(req);

    const { class_val, sec, search } = req.query;

    console.log("REQ.QUERY:", req.query);

    const values = [school_id];

    const whereClauses = ["s.school_id = $1"];

    let idx = 2;

    // CLASS FILTER
    if (class_val && class_val.trim() !== "") {
      whereClauses.push(`c.class = $${idx}`);
      values.push(class_val);
      idx++;
    }

    // SECTION FILTER
    if (sec && sec.trim() !== "") {
      whereClauses.push(`c.section = $${idx}`);
      values.push(sec);
      idx++;
    }

    // SEARCH FILTER
    if (search && search.trim() !== "") {
      const pattern = `%${search.trim()}%`;

      whereClauses.push(`
    (
      s.student_name::text ILIKE $${idx}
      OR s.reg_no::text ILIKE $${idx}
      OR s.email::text ILIKE $${idx}
      OR s.contact::text ILIKE $${idx}
    )
  `);

      values.push(pattern);
      idx++;
    }

    const query = `
      SELECT
        s.*,
        c.class AS class_val,
        c.section
      FROM student s
      LEFT JOIN class c
        ON s.class_id = c.class_id
      WHERE ${whereClauses.join(" AND ")}
      ORDER BY s.student_name ASC
    `;

    console.log("QUERY:", query);
    console.log("VALUES:", values);

    const result = await pool.query(query, values);

    return res.status(200).json({
      message: "Students fetched successfully",
      students: result.rows,
    });
  } catch (error) {
    console.error("VIEW STUDENTS ERROR:", error);

    return res.status(400).json({
      message: error.message,
    });
  }
};

const ViewStudentController = async (req, res) => {
  try {
    const school_id = await getSchoolId(req);
    const { student_id } = req.params;

    const result = await pool.query(
      `SELECT * FROM student WHERE student_id=$1 AND school_id=$2`,
      [student_id, school_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Student fetched successfully",
      student: result.rows[0],
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const UpdateStudentController = async (req, res) => {
  try {
    const school_id = await getSchoolId(req);
    const { student_id } = req.params;
    const existingStudent = await pool.query(
      `SELECT * FROM student WHERE student_id=$1 AND school_id=$2`,
      [student_id, school_id],
    );

    if (existingStudent.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    const currentStudent = existingStudent.rows[0];
    const updateData = { ...req.body };
    const updateFields = [];
    const values = [];
    let index = 1;

    const addField = (column, value) => {
      if (value !== undefined) {
        updateFields.push(`${column}=$${index}`);
        values.push(value);
        index += 1;
      }
    };

    addField("student_name", updateData.student_name);
    addField("gender", updateData.gender);
    addField("reg_no", updateData.reg_no);
    addField("fullAddress", updateData.fullAddress);
    addField("city", updateData.city);
    addField("state_living", updateData.state_living);
    addField("pincode", updateData.pincode);
    addField("email", updateData.email);
    addField("contact", updateData.contact);
    addField("roll_no", updateData.roll_no);
    addField("dob", updateData.dob);

    const admissionDate =
      updateData.admission_date ?? updateData.addmission_date;
    if (admissionDate !== undefined) {
      addField("addmission_date", admissionDate);
    }

    let class_id = currentStudent.class_id;
    if (updateData.class_val || updateData.sec) {
      const class_val =
        updateData.class_val ??
        (
          await pool.query(
            `SELECT class FROM class WHERE class_id=$1 AND school_id=$2`,
            [currentStudent.class_id, school_id],
          )
        ).rows[0]?.class;
      const sec =
        updateData.sec ??
        (
          await pool.query(
            `SELECT section FROM class WHERE class_id=$1 AND school_id=$2`,
            [currentStudent.class_id, school_id],
          )
        ).rows[0]?.section;

      class_id = await getClassId(school_id, class_val, sec);
      addField("class_id", class_id);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No valid fields provided" });
    }

    if (updateData.email) {
      const emailCheck = await pool.query(
        `SELECT student_id FROM student WHERE email=$1 AND school_id=$2 AND student_id <> $3`,
        [updateData.email, school_id, student_id],
      );
      if (emailCheck.rows.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }
    }

    if (updateData.reg_no) {
      const regNoCheck = await pool.query(
        `SELECT student_id FROM student WHERE reg_no=$1 AND school_id=$2 AND student_id <> $3`,
        [updateData.reg_no, school_id, student_id],
      );
      if (regNoCheck.rows.length > 0) {
        return res
          .status(400)
          .json({ message: "Registration No already exist" });
      }
    }

    if (updateData.roll_no) {
      const rollNoCheck = await pool.query(
        `SELECT student_id FROM student WHERE roll_no=$1 AND school_id=$2 AND student_id <> $3`,
        [updateData.roll_no, school_id, student_id],
      );
      if (rollNoCheck.rows.length > 0) {
        return res.status(400).json({ message: "Roll No already exist" });
      }
    }

    values.push(student_id, school_id);
    const result = await pool.query(
      `UPDATE student SET ${updateFields.join(", ")} WHERE student_id=$${index} AND school_id=$${index + 1} RETURNING *`,
      values,
    );

    return res.status(200).json({
      message: "Student updated successfully",
      student: result.rows[0],
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const DeleteStudentController = async (req, res) => {
  try {
    const school_id = await getSchoolId(req);
    const { student_id } = req.params;

    const result = await pool.query(
      `DELETE FROM student WHERE student_id=$1 AND school_id=$2 RETURNING student_id, student_name`,
      [student_id, school_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).json({
      message: "Student deleted successfully",
      student: result.rows[0],
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  AddStudentController,
  ViewStudentsController,
  ViewStudentController,
  UpdateStudentController,
  DeleteStudentController,
};
