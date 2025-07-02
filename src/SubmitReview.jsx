import React, { useState } from 'react';
import './submitReview.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SubmitReview() {
  const [formData, setFormData] = useState({
    location: '',
    user: '',
    clean: 1,
    rent: 1,
    electricity: 1,
    safety: 1,
    review: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const val = ['clean', 'rent', 'electricity', 'safety'].includes(name)
      ? Number(value)
      : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit', formData);
      toast.success("✅ Review submitted successfully!");
      setFormData({
        location: '',
        user: '',
        clean: 1,
        rent: 1,
        electricity: 1,
        safety: 1,
        review: ''
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="submit-container">
      <form className="review-form" onSubmit={handleSubmit}>
        <h2>Submit a Neighborhood Review</h2>

        <input
          type="text"
          name="location"
          placeholder="📍 Location (required)"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="user"
          placeholder="👤 Your Name (optional)"
          value={formData.user}
          onChange={handleChange}
        />

        {['clean', 'rent', 'electricity', 'safety'].map((field) => (
          <div className="slider-group" key={field}>
            <label>
              ⭐ Please rate {field.charAt(0).toUpperCase() + field.slice(1)}: <b>{formData[field]}</b>/10
            </label>
            <input
              type="range"
              name={field}
              min="1"
              max="10"
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <textarea
          name="review"
          placeholder="📝 Write your review..."
          value={formData.review}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit">🚀 Submit Review</button>
      </form>

      
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
}
