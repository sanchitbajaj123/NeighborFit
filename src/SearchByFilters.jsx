import React, { useState, useEffect } from 'react';
import { fetchFilteredLocations, fetchLocationDetails } from './api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './searchByFilters.css';

export default function SearchByFilters() {
  const [filters, setFilters] = useState({
    clean: 0,
    rent: 0,
    electricity: 0,
    safety: 0,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Load saved state from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    const savedResults = localStorage.getItem('results');

    if (savedFilters) setFilters(JSON.parse(savedFilters));
    if (savedResults) setResults(JSON.parse(savedResults));
  }, []);

  const handleSliderChange = (e) => {
    const updated = { ...filters, [e.target.name]: Number(e.target.value) };
    setFilters(updated);
    localStorage.setItem('filters', JSON.stringify(updated));
  };

  const handleSearch = async () => {
    try {
      const res = await fetchFilteredLocations(filters);
      if (res.data.length === 0) {
        toast.info('No locations match these filters');
      }
      setResults(res.data);
      localStorage.setItem('results', JSON.stringify(res.data));
      localStorage.setItem('filters', JSON.stringify(filters));
    } catch (err) {
      toast.error('Error fetching filtered data');
    }
  };

  const handleDirectSearch = async () => {
    if (!searchTerm.trim()) {
      toast.warn('Please enter a location name');
      return;
    }
    try {
      const res = await fetchLocationDetails(searchTerm);
      setSelectedLocation(res.data.location);
    } catch (err) {
      toast.error('Location not found');
    }
  };

  // Redirect on location select
  if (selectedLocation) {
    window.location.href = `/location/${selectedLocation}`;
  }

  return (
    <div className="search-filter-container">
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
              theme="dark"
            />
      <h2>🌐 Find Neighborhoods</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Type location (e.g. Delhi)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleDirectSearch}>Search</button>
      </div>

      <center>
        <div className="filter-section">
          <h3 style={{ marginTop: '0px' }}>Or <br />apply filters:</h3>
          {['clean', 'rent', 'electricity', 'safety'].map((field) => (
            <div key={field} className="slider-group">
              <label>
                {field.charAt(0).toUpperCase() + field.slice(1)}: {filters[field]}
              </label>
              <input
                type="range"
                name={field}
                min={field === 'rent' ? 1 : 0}
                max={10}
                value={filters[field]}
                onChange={handleSliderChange}
              />
            </div>
          ))}
          <button className="search-btn" onClick={handleSearch}>
            🔍 Apply Filters
          </button>
        </div>
      </center>

      <div className="results-list">
        {results.map((loc, i) => (
          <div key={i} className="location-card">
            <button onClick={() => setSelectedLocation(loc.location)}>
              📍 {loc.location}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
