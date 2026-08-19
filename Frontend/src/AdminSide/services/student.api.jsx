import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export async function viewStudentsApi(class_val, sec, search) {
  try {
    const response = await api.get("/school/student/view", {
      params: {
        class_val,
        sec,
        search,
      },
    });

    return response.data;
  } catch (err) {
    console.log("VIEW STUDENTS API ERROR:", err);
    throw err;
  }
}

export async function addStudentApi(studentData) {
  try {
    const response = await api.post("/school/student/addStudent", studentData);
    return response.data;
  } catch (err) {
    console.log("ADD STUDENT API ERROR:", err);
    throw err;
  }
}

export async function addParentApi(parentData) {
  try {
    const response = await api.post("/school/student/addParent", parentData);
    return response.data;
  } catch (err) {
    console.log("ADD PARENT API ERROR:", err);
    throw err;
  }
}
