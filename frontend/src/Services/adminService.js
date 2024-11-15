import axios from 'axios';
//admin api services
const API_URL = 'http://localhost:5000/api';

const getUsers = async (token) => {
    return await axios.get(`${API_URL}/user/users`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const archiveUser = async (userId, token) => {
    return await axios.put(`${API_URL}/user/archive/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const activateUser = async (userId, token) => {
    return await axios.put(`${API_URL}/user/users/activate/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const getAds = async (token) => {
    return await axios.get(`${API_URL}/marketplace/ads/admin`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const archiveAd = async (adId, token) => {
    return await axios.put(`${API_URL}/marketplace/ads/archive/${adId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const activateAd = async (adId, token) => {
    return await axios.put(`${API_URL}/marketplace/ads/activate/${adId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export { getUsers, archiveUser, activateUser, getAds, archiveAd, activateAd };
