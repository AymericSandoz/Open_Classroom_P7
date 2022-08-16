import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Connexion from '../../pages/Connexion';
//import GlobalStyle from ../../ index.js;
//import error from ../ error.js;
//import Header from './components/Header' ////////////
const index = () => {
    return (
        <BrowserRouter>
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/Connexion" element={<Connexion />} />
            </Routes>
        </BrowserRouter>);
};


export default index;