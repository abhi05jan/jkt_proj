import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (credentials: { username: string; password: string }) =>
    api.post("/auth/login/", credentials);

export const getBooks = () => api.get("/books/");
export const getBook = (id: number) => api.get(`/books/${id}/`);
export const createBook = (book: {
    title: string;
    author: string;
    genre: string;
    year_published: number;
}) => api.post("/books/", book);
export const updateBook = (
    id: number,
    book: Partial<{
        title: string;
        author: string;
        genre: string;
        year_published: number;
    }>
) => api.put(`/books/${id}/`, book);
export const deleteBook = (id: number) => api.delete(`/books/${id}/`);
export const getReviews = (bookId: number) => api.get(`/books/${bookId}/reviews/`);
export const createReview = (
    bookId: number,
    review: { user_id: string; review_text: string; rating: number }
) => api.post(`/books/${bookId}/reviews/`, review);
export const getSummary = (bookId: number) => api.get(`/books/${bookId}/summary/`);
export const getRecommendations = (genre: string) =>
    api.get(`/recommendations/?genre=${genre}`);

export { api };