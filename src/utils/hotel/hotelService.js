import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${baseURL}/api/hotel/`;

// Create new hotel
const createHotel = async (hotelData, userId, companyId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }; 
  const refinedData = {
    owner: userId, 
    company: companyId, 
    ...hotelData,
  }; 
  const response = await axios.post(API_URL + "new", refinedData, config);
 
  return response.data;
};


// Get user hotels
const getMyHotel = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + id, config); 
  if (response.data) {
    localStorage.setItem("user_hotels", JSON.stringify(response.data));
  }
  return response.data;
};

// Get all hotel data
const getAllHotels = async () => {
  const response = await axios.get(API_URL); 
  if (response.data) {
    localStorage.setItem("hotels", JSON.stringify(response.data));
  }
  return response.data;
}

const hotelService = { createHotel, getMyHotel, getAllHotels };

export default hotelService;
