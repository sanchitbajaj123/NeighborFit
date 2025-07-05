// src/components/LocationDetails.jsx
import React, { useEffect, useState } from 'react';
import { fetchLocationDetails } from './api';
import { useParams, useNavigate } from 'react-router-dom';
import './locationDetails.css';

export default function LocationDetails() {
  const [data, setData] = useState(null);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocationDetails(name)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [name]);

  if (!data) return <p className="loading">Loading...</p>;

  return (
    <div className="location-details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="summary">
        
        <h2>📍 {data.location}</h2>
        <div className='summary-block' style={{display:"flex",justifyContent:"space-between"}}>
        <div>
        <p style={{marginTop:"0px"}}><strong>Avg Cleanliness:</strong> {data.average.clean}</p>
        <p><strong>Avg Rent:</strong> {data.average.rent}</p>
        <p><strong>Avg Electricity:</strong> {data.average.electricity}</p>
        <p><strong>Avg Safety:</strong> {data.average.safety}</p>
        <p><strong>Total Reviews:</strong> {data.average.totalReviews}</p>
        </div>
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTFjOpQeDwyVrJZbfrAy3bxZI-89dODYjnw&s" alt="" />
        </div>
        </div>
      </div>

      <div className="reviews-section">
        <h3>All Reviews</h3>
        <ul>
          {data.reviews.map((r, i) => (
            <li key={i} className="review-card">
              <strong>{r.user || "Anonymous"}</strong><br />
              <span className="review-text">"{r.review}"</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
