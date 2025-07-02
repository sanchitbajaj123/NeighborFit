import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import SubmitReview from './SubmitReview';
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<div style={{color:"white"}}>Find Page Coming Soon</div>} />
        <Route path="/submit" element={ <SubmitReview/> } />
      </Routes>
    </>

  );
}
