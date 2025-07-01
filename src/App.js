import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<div style={{ color: 'white', padding: '2rem' }}>Find Page Coming Soon</div>} />
        <Route path="/submit" element={<div style={{ color: 'white', padding: '2rem' }}>Submit Page Coming Soon</div>} />
      </Routes>
    </>

  );
}
