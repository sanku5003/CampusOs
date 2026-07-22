import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router';
import Login from './AdminSide/pages/Login';
import Register from './AdminSide/pages/Register';



export const router = createBrowserRouter([
   {
    path : '/login' ,
    element : <Login/>
   } , {
    path : '/register' ,
    element : <Register/>
   }
  
])