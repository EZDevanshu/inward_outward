// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import InwardEntry from './pages/inward/InwardEntry.jsx';
import OutwardEntry from './pages/outward/OutwardEntry.jsx';
import InwardOutwardEntry from './pages/combined/InwardOutwardEntry.jsx';
import OfficeMaster from './pages/masters/OfficeMaster.jsx';
import ModeMaster from './pages/masters/ModeMaster.jsx';
import FromToMaster from './pages/masters/FromToMaster.jsx';
import CourierCompanyMaster from './pages/masters/CourierCompanyMaster.jsx';
import './styles/main.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inward" element={<InwardEntry />} />
        <Route path="/outward" element={<OutwardEntry />} />
        <Route path="/combined" element={<InwardOutwardEntry />} />
        <Route path="/masters/offices" element={<OfficeMaster />} />
        <Route path="/masters/modes" element={<ModeMaster />} />
        <Route path="/masters/fromto" element={<FromToMaster />} />
        <Route path="/masters/couriers" element={<CourierCompanyMaster />} />
      </Routes>
    </Router>
  );
}

export default App;
