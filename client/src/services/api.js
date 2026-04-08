import axios from 'axios';

// --- CREATE AXIOS INSTANCE ---
const API = axios.create({
    baseURL: window.location.origin.includes('localhost')
        ? 'http://localhost:5000/api'
        : '/api',
});

// --- REQUEST INTERCEPTOR (Attach Token Safely) ---
API.interceptors.request.use(
    (req) => {
        const userInfo = localStorage.getItem('userInfo');

        if (userInfo) {
            const user = JSON.parse(userInfo);

            if (user?.token) {
                req.headers.Authorization = `Bearer ${user.token}`;
            }
        }

        return req;
    },
    (error) => Promise.reject(error)
);

// --- RESPONSE INTERCEPTOR (Handle Expired Token) ---
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // ❌ Token invalid or expired
            console.warn("Unauthorized! Logging out...");

            localStorage.removeItem('userInfo');

            // Optional: redirect to login page
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

// --- AUTH CALLS ---
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// --- TRIPS ---
export const getTrips = () => API.get('/trips');
export const createTrip = (tripData) => API.post('/trips', tripData);
export const deleteTrip = (id) => API.delete(`/trips/${id}`);

// --- ITEMS ---
export const addItem = (tripId, itemData) =>
    API.post(`/trips/${tripId}/items`, itemData);

export const deleteItem = (tripId, itemId) =>
    API.delete(`/trips/${tripId}/items/${itemId}`);

// --- REPORTS ---
export const getCategoryStats = () =>
    API.get('/reports/category-stats');

export const getMonthlyStats = () =>
    API.get('/reports/monthly-stats');

export default API;