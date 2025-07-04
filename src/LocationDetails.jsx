// src/components/LocationDetails.jsx
import React, { useEffect, useState } from 'react';
import { fetchLocationDetails } from './api';

export default function LocationDetails({ location }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchLocationDetails(location)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [location]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>📍 {data.location}</h2>
      <p><strong>Avg Cleanliness:</strong> {data.average.clean}</p>
      <p><strong>Avg Rent:</strong> {data.average.rent}</p>
      <p><strong>Avg Electricity:</strong> {data.average.electricity}</p>
      <p><strong>Avg Safety:</strong> {data.average.safety}</p>
      <p><strong>Total Reviews:</strong> {data.average.totalReviews}</p>

      <h3>All Reviews</h3>
      <ul>
        {data.reviews.map((r, i) => (
          <li key={i} style={{ marginBottom: '10px' }}>
            <strong>{r.user || "Anonymous"}</strong>: {r.review}
          </li>
        ))}
      </ul>
    </div>
  );
}
