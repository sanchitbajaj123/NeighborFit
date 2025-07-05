import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For programmatic navigation
import './home.css'; // Importing styling

// Home page component
export default function Home() {
  const navigate = useNavigate(); // Hook to navigate between pages

  // When Home loads, clear any stored search results or filters
  useEffect(() => {
    localStorage.removeItem('results');   // Remove previous search results
    localStorage.removeItem('filters');   // Remove previous filters
  }, []);

  return (
    <div className="home-container">
      {/* Card-style welcome area */}
      <div className="glass-card">
        <h1>Welcome to NeighborFit 👋</h1>

        <p>
          Helping you find the perfect place to live —<br />
          or help others find theirs.
        </p>

        {/* Action buttons for navigating to other pages */}
        <div className="button-group">
          <button onClick={() => navigate('/find')}>
            🔍 Search Neighborhoods
          </button>
          <button onClick={() => navigate('/submit')}>
            ✍️ Submit a Review
          </button>
        </div>
      </div>
    </div>
  );
}
