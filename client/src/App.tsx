import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UnderWaterSystem from "./pages/UnderWaterSystem";
import DataCenter from "./pages/DataCenter";

import AdminManagement from "./pages/AdminManagement";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/underwater" element={<UnderWaterSystem />} />
          <Route path="/data" element={<DataCenter />} />

          <Route path="/admin" element={<AdminManagement />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
