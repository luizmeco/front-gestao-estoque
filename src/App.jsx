import React from "react";
import './App.css'
import NavBar from './components/Navbar.jsx'
import { Outlet } from "react-router-dom";


const App = () => {
    return (
        <div className='bg-dark pb-3'>
            <NavBar />
            <div className='col-md-10 mx-auto text-center bg-primary bg-opacity-50 mt-4 rounded-4 fs-2 p-3 shadow-lg'>
                <Outlet />
            </div>
        </div>
    )
};

export default App