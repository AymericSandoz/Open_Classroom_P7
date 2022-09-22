import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Connexion from '../../pages/Connexion';
import Navbar from '../Navbar';


const index = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/Connexion" element={<Connexion />} />
            </Routes>
        </BrowserRouter>);
};


export default index;