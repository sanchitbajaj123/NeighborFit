// src/api.js
import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const fetchFilteredLocations = (filters) =>
  API.get('/filter', { params: filters });

export const fetchLocationDetails = async (loc) =>{
  console.log(loc)
  const data=await API.get(`/location/${loc}`);
  console.log(data)
  return data
}
export const submit=async (formData)=>{
  const data=await API.post('/submit', formData)
  console.log(data)
  return data

}
export default API;
