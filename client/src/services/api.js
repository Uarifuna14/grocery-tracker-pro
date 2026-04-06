import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const getTrips = () => API.get('/trips');
export const createTrip = (tripData) => API.post('/trips', tripData);
export const deleteTrip = (id) => API.delete(`/trips/${id}`);

export const addItem = (tripId, itemData) => API.post(`/trips/${tripId}/items`, itemData);
export const deleteItem = (tripId, itemId) => API.delete(`/trips/${tripId}/items/${itemId}`);

export const getCategoryStats = () => API.get('/reports/category-stats');

export default API;