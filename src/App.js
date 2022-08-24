import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './views/login'; 
import Home from './views/home';
import GuardedRoute from './components/auth/GuardedRoute';
import Driver from "./views/driver";

function App() {
    return ( 
      <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} /> 
            <Route path="/" element={<Home />} />
            <Route path="/driver" element={<GuardedRoute><Driver /></GuardedRoute>} />
          </Routes>
        </div>
    );
}

export default App;
