
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from "react-router";
import React from 'react';
import Root from './components/Root/Root';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import RegisterHero from './components/RegisterHero';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }, {
        path: '/registerHero',
        element: <RegisterHero />
      }
    ]
  }
]);



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>

  </React.StrictMode>
)