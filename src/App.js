import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from './views/login'; 
import Home from './views/home';

function App() {
    return ( 
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} /> 
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
    );
}

export default App;
