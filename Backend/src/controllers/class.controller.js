const pool = require("../db/db");

const getSchoolId = async (req) => {
  const school = await pool.query(`SELECT school_id FROM school WHERE school_id=$1`, [
    req.user.id,
  ]);

  if (school.rows.length === 0) {
    throw new Error("School not found");
  }

  return school.rows[0].school_id;
};

const AddClassController = async (req, res) => {
  const { class_val, section, room_no , medium } = req.body;

  if (!class_val || !section) {
    return res.status(400).json({ message: "Class and section are required" });
  }

  try {
    const school_id = await getSchoolId(req);

    const existingClass = await pool.query(
      `SELECT class_id FROM class WHERE class=$1 AND section=$2 AND school_id=$3`,
      [class_val, section, school_id],
    );

    if (existingClass.rows.length > 0) {
      return res.status(400).json({ message: "Class already exists" });
    }

    const result = await pool.query(
      `INSERT INTO class (class, section, room_no,medium , school_id)
       VALUES ($1, $2, $3, $4 , $5)
       RETURNING *`,
      [class_val, section, room_no || null,medium , school_id],
    );

    return res.status(201).json({
      message: "Class added successfully",
      class: result.rows[0],
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const ViewClassesController = async (req, res) => {
  try {
    const school_id = await getSchoolId(req);
    const result = await pool.query(
      `SELECT * FROM class WHERE school_id=$1 ORDER BY class ASC, section ASC`,
      [school_id],
    );

    return res.status(200).json({
      message: "Classes fetched successfully",
      classes: result.rows,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const ViewClassController = async (req, res) => {
  try {
    const school_id = await getSchoolId(req);
    const { class_id } = req.params;

    const result = await pool.query(
      `SELECT * FROM class WHERE class_id=$1 AND school_id=$2`,
      [class_id, school_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json({
      message: "Class fetched successfully",
      class: result.rows[0],
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const UpdateClassController = async (req, res) => {
  try {
    const school_id = await getSchoolId(req);
    const { class_id } = req.params;
    const existingClass = await pool.query(
      `SELECT * FROM class WHERE class_id=$1 AND school_id=$2`,
      [class_id, school_id],
    );

    if (existingClass.rows.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    const currentClass = existingClass.rows[0];
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

    addField("class", updateData.class_val ?? updateData.class);
    addField("section", updateData.section);
    addField("room_no", updateData.room_no);

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No valid fields provided" });
    }

    const newClassName = updateData.class_val ?? updateData.class ?? currentClass.class;
    const newSection = updateData.section ?? currentClass.section;

    const duplicateCheck = await pool.query(
      `SELECT class_id FROM class WHERE class=$1 AND section=$2 AND school_id=$3 AND class_id <> $4`,
      [newClassName, newSection, school_id, class_id],
    );

    if (duplicateCheck.rows.length > 0) {
      return res.status(400).json({ message: "Class already exists" });
    }

    values.push(class_id, school_id);

    const result = await pool.query(
      `UPDATE class SET ${updateFields.join(", ")} WHERE class_id=$${index} AND school_id=$${index + 1} RETURNING *`,
      values,
    );

    return res.status(200).json({
      message: "Class updated successfully",
      class: result.rows[0],
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const DeleteClassController = async (req, res) => {
  try {
    const school_id = await getSchoolId(req);
    const { class_id } = req.params;

    const result = await pool.query(
      `DELETE FROM class WHERE class_id=$1 AND school_id=$2 RETURNING class_id, class, section`,
      [class_id, school_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json({
      message: "Class deleted successfully",
      class: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(400).json({
        message: "Cannot delete class because students are linked to it",
      });
    }

    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  AddClassController,
  ViewClassesController,
  ViewClassController,
  UpdateClassController,
  DeleteClassController,
};

