// Import Axios for making HTTP requests
import axios from 'axios';

// Create an Axios instance with a base URL set from environment variable
// This allows you to easily switch between local and production servers
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

/**
 * Fetch filtered locations based on user-selected criteria
 * @param {Object} filters - { clean, rent, electricity, safety }
 * @returns {Promise} - Axios response containing filtered locations
 */
export const fetchFilteredLocations = (filters) =>
  API.get('/filter', { params: filters });

/**
 * Fetch full details of a specific location
 * @param {string} loc - Location name (used in the dynamic URL)
 * @returns {Promise} - Axios response containing location details
 */
export const fetchLocationDetails = async (loc) => {
  const data = await API.get(`/location/${loc}`);
  console.log(data); // Debug log: API response
  return data;
};

/**
 * Submit a new review form
 * @param {Object} formData - Contains location, ratings, and review
 * @returns {Promise} - Axios response confirming submission
 */
export const submit = async (formData) => {
  const data = await API.post('/submit', formData);
  return data;
};

// Export the Axios instance in case it's needed elsewhere (e.g., for interceptors)
export default API;
