import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${baseURL}/api/business/`;

// Create new company
const createCompany = async (companyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "new", companyData, config);
  if (response.data) {
    localStorage.setItem("company", JSON.stringify(response.data));
  }
  return response.data;
};

// Get company data
const getCompany = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  if (response.data) {
    localStorage.setItem("company", JSON.stringify(response.data));
  }
  return response.data;
};

// Get all company data
const getAllCompanies = async () => {
  const response = await axios.get(API_URL + "all"); 
  if (response.data) {
    localStorage.setItem("companies", JSON.stringify(response.data));
  }
  return response.data;
};

// Remove company from storage
const removeCompany = () => {
  localStorage.removeItem("company");
};

const companyService = {
  createCompany,
  getCompany,
  getAllCompanies,
  removeCompany,
};

export default companyService;
