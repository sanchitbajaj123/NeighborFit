import React, { useState } from 'react';
import './submitReview.css';
import { submit } from './api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SubmitReview() {
  // State to hold form data
  const [formData, setFormData] = useState({
    location: '',      // Neighborhood/location name
    user: '',          // User name (optional)
    clean: 1,          // Rating sliders: 1–10
    rent: 1,
    electricity: 1,
    safety: 1,
    review: ''         // Review text
  });

  // Handles form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If it's a rating field, convert to Number
    const val = ['clean', 'rent', 'electricity', 'safety'].includes(name)
      ? Number(value)
      : value;

    setFormData({ ...formData, [name]: val });
  };

  // Submits form data via API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submit(formData); // Call API to submit review
      toast.success("✅ Review submitted successfully!");

      // Reset form after successful submission
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

        {/* Location input (required) */}
        <input
          type="text"
          name="location"
          placeholder="📍 Location (required)"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {/* Optional user name */}
        <input
          type="text"
          name="user"
          placeholder="👤 Your Name (optional)"
          value={formData.user}
          onChange={handleChange}
        />

        {/* Rating sliders */}
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

        {/* Review text area */}
        <textarea
          name="review"
          placeholder="📝 Write your review..."
          value={formData.review}
          onChange={handleChange}
          rows={4}
        />

        {/* Submit button */}
        <button type="submit">🚀 Submit Review</button>
      </form>

      {/* Toast for success/error messages */}
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
