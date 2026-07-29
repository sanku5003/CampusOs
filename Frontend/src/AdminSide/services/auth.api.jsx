import React from "react";
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export async function register(schoolData) {
    try{
        const response = await api.post('/school/register' , schoolData);
        return response.data;
    } catch (err) {
        console.log(err);
        
    }
}

export async function login({ email, passcode }) {
  try {
    
    

    const response = await api.post("/school/login", {
      email,
      passcode,
    });

   
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await api.get("/school/logout");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getProfile() {
  try {
    const response = await api.get("/school/profile");
    return response.data;
  } catch (error) {
    console.error("getMe error:", error.response?.data || error.message);
    throw error;
  }
}
