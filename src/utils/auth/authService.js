import axios from 'axios';

const rootURL = window.location.origin;
const httpType = window.location.protocol;
const proxy = `${httpType}://${rootURL}`

const API_URL = `${proxy}/api/user/`;

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
        localStorage.setItem('user',JSON.stringify())
    }
    return response.data;
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user',JSON.stringify())
    }
    return response.data;
}

// Logout user
const logout = () => {
    localStorage.removeItem('user');
}


const authService = {register, login, logout}

export default authService;