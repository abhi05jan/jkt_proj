import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
// Add JWT token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const login = (credentials) => api.post("/auth/login/", credentials);
export const getBooks = () => api.get("/books/");
export const getBook = (id) => api.get(`/books/${id}/`);
export const createBook = (book) => api.post("/books/", book);
export const updateBook = (id, book) => api.put(`/books/${id}/`, book);
export const deleteBook = (id) => api.delete(`/books/${id}/`);
export const getReviews = (bookId) => api.get(`/books/${bookId}/reviews/`);
export const createReview = (bookId, review) => api.post(`/books/${bookId}/reviews/`, review);
export const getSummary = (bookId) => api.get(`/books/${bookId}/summary/`);
export const getRecommendations = (genre) => api.get(`/recommendations/?genre=${genre}`);
export { api };
