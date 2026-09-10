import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
});

export const getAnalytics = async (filters = {}) => {
    try {
        const params = {};

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params[key] = value;
            }
        });

        const response = await API.get('/insights/analytics', {
            params
        });

        return response.data;
    } catch (error) {
        return { error: 'Failed to fetch analytics data' };
    }
};

export const getFilterOptions = async () => {
    try {
        const response = await API.get('/insights/filters');

        return response.data;
    } catch (error) {
        return { error: 'Failed to fetch filter options' };
    }
};

export const getInsights = async (filters = {}, page = 1, limit = 10) => {
    try {
        const params = { ...filters, page, limit };

        Object.keys(params).forEach(key => {
            if (params[key] === null || params[key] === undefined || params[key] === '') {
                delete params[key];
            }
        });

        const response = await API.get('/insights', {
            params
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching insights:', error);
        return { error: 'Failed to fetch insights' };
    }
};