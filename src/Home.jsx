import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="glass-card">
        <h1>Welcome to NeighborFit 👋</h1>
        <p>
          Helping you find the perfect place to live —
          or help others find theirs.
        </p>

        <div className="button-group">
          <button onClick={() => navigate('/find')}>🔍 Search Neighborhoods</button>
          <button onClick={() => navigate('/submit')}>✍️ Submit a Review</button>
        </div>
      </div>
    </div>
  );
}
