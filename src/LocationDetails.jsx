// React imports
import React, { useEffect, useState } from 'react';
import { fetchLocationDetails } from './api'; // API call to fetch location data
import { useParams, useNavigate } from 'react-router-dom'; // To read URL params and navigate
import './locationDetails.css'; // CSS for styling

// Component for showing detailed information of a selected location
export default function LocationDetails() {
  const [data, setData] = useState(null); // State to store location data
  const { name } = useParams();           // Extract location name from route parameters
  const navigate = useNavigate();         // For navigating back

  // Fetch data for this specific location when component mounts or name changes
  useEffect(() => {
    fetchLocationDetails(name)
      .then(res => setData(res.data))
      .catch(err => console.error(err)); // Log any API errors
  }, [name]);

  // Show a loading message while data is being fetched
  if (!data) return <p className="loading">Loading...</p>;

  return (
    <div className="location-details-container">
      {/* Back button to return to previous page */}
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      {/* Summary section showing average stats and an image */}
      <div className="summary">
        <h2>📍 {data.location}</h2>

        <div className='summary-block' style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p style={{ marginTop: "0px" }}><strong>Avg Cleanliness:</strong> {data.average.clean}</p>
            <p><strong>Avg Rent:</strong> {data.average.rent}</p>
            <p><strong>Avg Electricity:</strong> {data.average.electricity}</p>
            <p><strong>Avg Safety:</strong> {data.average.safety}</p>
            <p><strong>Total Reviews:</strong> {data.average.totalReviews}</p>
          </div>

          {/* Image for visual enhancement */}
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZTFjOpQeDwyVrJZbfrAy3bxZI-89dODYjnw&s"
              alt="Neighborhood"
            />
          </div>
        </div>
      </div>

      {/* Section listing all reviews */}
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
