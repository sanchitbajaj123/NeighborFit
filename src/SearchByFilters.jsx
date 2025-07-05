import React, { useState, useEffect } from 'react';
import { fetchFilteredLocations, fetchLocationDetails } from './api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './searchByFilters.css';

export default function SearchByFilters() {
  // Initial filter values
  const [filters, setFilters] = useState({
    clean: 0,
    rent: 0,
    electricity: 0,
    safety: 0,
  });

  // UI state variables
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false); // Visual loader state

  // 🔁 On component mount, get saved state from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    const savedResults = localStorage.getItem('results');

    if (savedFilters) setFilters(JSON.parse(savedFilters));
    if (savedResults) setResults(JSON.parse(savedResults));
  }, []);

  // 🔄 Handle slider change and persist filters in localStorage
  const handleSliderChange = (e) => {
    const updated = { ...filters, [e.target.name]: Number(e.target.value) };
    setFilters(updated);
    localStorage.setItem('filters', JSON.stringify(updated));
  };

  // 🔍 Filter search (using filters)
  const handleSearch = async () => {
    const toastId = toast.loading("Fetching results...");
    setLoading(true);

    try {
      const res = await fetchFilteredLocations(filters);
      setResults(res.data);

      // Save in localStorage
      localStorage.setItem('results', JSON.stringify(res.data));
      localStorage.setItem('filters', JSON.stringify(filters));

      // Show appropriate toast
      if (res.data.length === 0) {
        toast.update(toastId, {
          render: "No locations match these filters.",
          type: "info",
          isLoading: false,
          autoClose: 3000
        });
      } else {
        toast.update(toastId, {
          render: "Results loaded successfully ✅",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (err) {
      toast.update(toastId, {
        render: "Error fetching filtered data ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔎 Direct location search
  const handleDirectSearch = async () => {
    if (!searchTerm.trim()) {
      toast.warn('Please enter a location name');
      return;
    }

    try {
      const res = await fetchLocationDetails(searchTerm);
      setSelectedLocation(res.data.location); // Triggers redirect
    } catch (err) {
      toast.error('Location not found');
    }
  };

  // ⏩ Navigate to location details
  if (selectedLocation) {
    window.location.href = `/location/${selectedLocation}`;
  }

  return (
    <div className="search-filter-container">
      {/* 🍞 Toast notifications */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      {/* 🔍 Title */}
      <h2>🌐 Find Neighborhoods</h2>

      {/* 🔍 Direct search by name */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Type location (e.g. Delhi)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleDirectSearch}>Search</button>
      </div>

      {/* 🎚️ Filters section */}
      <center>
        <div className="filter-section">
          <h3 style={{ marginTop: '0px' }}>Or <br />apply filters:</h3>

          {[
            { key: 'clean', label: 'Cleanliness (0 = dirty, 10 = very clean)' },
            { key: 'rent', label: 'Rent (1 = very affordable, 10 = expensive)' },
            { key: 'electricity', label: 'Electricity (0 = poor, 10 = stable)' },
            { key: 'safety', label: 'Safety (0 = dangerous, 10 = very safe)' }
          ].map(({ key, label }) => (
            <div key={key} className="slider-group">
              <label>{label}: {filters[key]}</label>
              <input
                type="range"
                name={key}
                min={key === 'rent' ? 1 : 0}
                max={10}
                value={filters[key]}
                onChange={handleSliderChange}
              />
            </div>
          ))}

          {/* Filter search button */}
          <button className="search-btn" onClick={handleSearch}>
            🔍 Apply Filters
          </button>
        </div>
      </center>

      {/* 🌀 Loading state */}
      {loading && (
        <p style={{ textAlign: 'center', color: '#ccc', marginTop: '1rem' }}>
          🔄 Loading...
        </p>
      )}

      {/* 📍 Results */}
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
