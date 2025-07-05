import React, { useState, useEffect } from 'react';
import { fetchFilteredLocations, fetchLocationDetails } from './api'; // API methods
import { toast, ToastContainer } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css';
import './searchByFilters.css'; // Styling

export default function SearchByFilters() {
  // State for filter sliders
  const [filters, setFilters] = useState({
    clean: 0,
    rent: 0,
    electricity: 0,
    safety: 0,
  });

  // Search bar and result state
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false); // For text-based loading UI

  // Load saved filter & results from localStorage on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    const savedResults = localStorage.getItem('results');

    if (savedFilters) setFilters(JSON.parse(savedFilters));
    if (savedResults) setResults(JSON.parse(savedResults));
  }, []);

  // Handle slider updates + save in localStorage
  const handleSliderChange = (e) => {
    const updated = { ...filters, [e.target.name]: Number(e.target.value) };
    setFilters(updated);
    localStorage.setItem('filters', JSON.stringify(updated));
  };

  // Handle filter-based search
  const handleSearch = async () => {
    const toastId = toast.loading("Fetching results..."); // Show loading toast
    setLoading(true); // Show visual loading

    try {
      const res = await fetchFilteredLocations(filters);

      // Save results and filters to localStorage
      setResults(res.data);
      localStorage.setItem('results', JSON.stringify(res.data));
      localStorage.setItem('filters', JSON.stringify(filters));

      // Show proper toast messages based on results
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
      // Handle error case
      toast.update(toastId, {
        render: "Error fetching filtered data ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setLoading(false); // Hide visual loading
    }
  };

  // Handle direct search by location name
  const handleDirectSearch = async () => {
    if (!searchTerm.trim()) {
      toast.warn('Please enter a location name');
      return;
    }

    try {
      const res = await fetchLocationDetails(searchTerm);
      setSelectedLocation(res.data.location); // Navigate after fetch
    } catch (err) {
      toast.error('Location not found');
    }
  };

  // Navigate to location detail if selected
  if (selectedLocation) {
    window.location.href = `/location/${selectedLocation}`;
  }

  return (
    <div className="search-filter-container">
      {/* Toast Notifications */}
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

      {/* Direct Search Input */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Type location (e.g. Delhi)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleDirectSearch}>Search</button>
      </div>

      {/* Filter Sliders */}
      <center>
        <div className="filter-section">
          <h3 style={{ marginTop: '0px' }}>Or <br />apply filters:</h3>

          {/* Map sliders dynamically */}
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

      {/* Optional Loading UI */}
      {loading && (
        <p style={{ textAlign: 'center', color: '#ccc', marginTop: '1rem' }}>
          🔄 Loading...
        </p>
      )}

      {/* Filtered Results */}
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
