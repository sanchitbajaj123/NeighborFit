import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import SubmitReview from './SubmitReview';
import SearchByFilters from './SearchByFilters';
import LocationDetails from './LocationDetails';
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<SearchByFilters/>}/>
        <Route path="/location/:name" element={<LocationDetails />} />
        <Route path="/submit" element={ <SubmitReview/> } />
      </Routes>
    </>

  );
}
