import React from "react";
import './App.css'
import NavBar from './components/Navbar.jsx'
import { Outlet } from "react-router-dom";
import wallpaper from './assets/img/wallpaper.png';



const App = () => {
    return (
        <div className='pb-3'>
            <div className="bg-image" style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh'
            
            }}>
                <NavBar />
            <div className='col-md-11 mx-auto text-center bg-secondary mt-4 rounded-4 fs-2 p-3 shadow-lg'>
                <Outlet />
            </div>
            </div>
        </div>
    )
};

export default App