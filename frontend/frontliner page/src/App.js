// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProjectDetails from './components/ProjectDetails';
import './styles.css';

const App = () => {
  const n = 5; // Default value for the maximum stage

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage n={n} />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
