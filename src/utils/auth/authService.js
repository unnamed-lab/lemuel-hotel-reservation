import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;
const API_URL = `${baseURL}/api/user/`;


// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    console.log(response.data);
    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data;
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data;
}

// Logout user
const logout = () => {
    localStorage.removeItem('user');
}


const authService = {register, login, logout}

export default authService;