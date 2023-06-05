import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import TransporterDashboard from "./components/TransporterDashboard";
import ManufacturerDashboard from "./components/ManufacturerDashboard";
import TLogin from "./components/TLogin";
import MLogin from "./components/MLogin";
import MRegister from "./components/MRegister";
import TRegister from "./components/TRegister";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transporter/login" element={<TLogin />} />
          <Route path="/manufacturer/login" element={<MLogin />} />

          <Route path="/manufacturer/register" element={<MRegister />} />
          <Route path="/transporter/register" element={<TRegister />} />
          
          <Route path="/transporter/dashboard" element={<TransporterDashboard />} />
          <Route path="/manufacturer/dashboard" element={<ManufacturerDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
