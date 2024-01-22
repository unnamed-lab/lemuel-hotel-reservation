import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${baseURL}/api/booking/`;

const createOrder = async (orderData, token, pageId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "new", orderData, config);
  if (response.data) {
    JSON.parse(sessionStorage.setItem(`item-${pageId}`));
  }
  return response.data;
};

const approveOrder = async (token, pageId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + pageId + "/approve", config);
  if (response.data) {
    console.log(response.data);
  }
  return response.data;
};

const rejectOrder = async (token, pageId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + pageId + "/reject", config);
  if (response.data) {
    console.log(response.data);
  }
  return response.data;
};

const getOrder = async (token, pageId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + pageId, config);
  if (response.data) {
    console.log(response.data);
  }
  return response.data;
};

const getMyOrders = async (token, pageId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "/mine/" + pageId, config);
  if (response.data) {
    console.log(response.data);
  }
  return response.data;
};

const deleteOrder = async (token, pageId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + pageId, config);
  if (response.data) {
    console.log(response.data);
  }
  return response.data;
};

const bookingService = {
  createOrder,
  approveOrder,
  rejectOrder,
  getOrder,
  deleteOrder,
  getMyOrders,
};

export default bookingService;
