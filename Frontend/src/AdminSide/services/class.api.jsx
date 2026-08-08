import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export async function addClassApi({className , section , room , medium}) {

    const response = await api.post("/school/class/addClass" , {class_val : className , section ,room_no : room , medium});
    return response.data;
  
}

export async function viewClasses() {
  try {
    const response = await api.get("/school/class/view");
  
    
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
