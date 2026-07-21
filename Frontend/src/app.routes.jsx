import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router';
import Auth from './AdminSide/pages/Auth';


export const router = createBrowserRouter([
   {
    path : '/login' ,
    element : <Auth/>
   } , {
    path : '/register' ,
    element : <Auth/>
   }
  
])