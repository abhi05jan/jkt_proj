import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBooks, getBook, getReviews, getSummary, getRecommendations, createBook as apiCreateBook } from "../services/api";

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    year_published: number;
    summary?: string;
}

interface Review {
    id: number;
    review_text: string;
    rating: number;
}

interface Summary {
    summary: string;
    average_rating: number;
}

interface BookState {
    books: Book[];
    book: Book | null;
    reviews: Review[];
    summary: Summary | null;
    loading: boolean;
    error: string | null;
}

const initialState: BookState = {
    books: [],
    book: null,
    reviews: [],
    summary: null,
    loading: false,
    error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    const response = await getBooks();
    return response.data;
});

export const fetchBook = createAsyncThunk("books/fetchBook", async (id: number) => {
    const response = await getBook(id);
    return response.data;
});

export const createBook = createAsyncThunk(
    "books/createBook",
    async (book: { title: string; author: string; genre: string; year_published: number }) => {
        const response = await apiCreateBook(book);
        return response.data;
    }
);

export const fetchReviews = createAsyncThunk("books/fetchReviews", async (bookId: number) => {
    const response = await getReviews(bookId);
    return response.data;
});

export const createReview = createAsyncThunk(
    "books/createReview",
    async ({ bookId, review }: { bookId: number; review: { user_id: string; review_text: string; rating: number } }) => {
        const response = await createReview(bookId, review);
        return response.data;
    }
);

export const fetchSummary = createAsyncThunk("books/fetchSummary", async (bookId: number) => {
    const response = await getSummary(bookId);
    return response.data;
});

export const fetchRecommendations = createAsyncThunk("books/fetchRecommendations", async (genre: string) => {
    const response = await getRecommendations(genre);
    return response.data;
});

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.books = action.payload;
                state.loading = false;
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.book = action.payload;
                state.loading = false;
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state.books.push(action.payload);
                state.loading = false;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.reviews = action.payload;
                state.loading = false;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
                state.loading = false;
            })
            .addCase(fetchSummary.fulfilled, (state, action) => {
                state.summary = action.payload;
                state.loading = false;
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.books = action.payload;
                state.loading = false;
            });
    },
});

export default bookSlice.reducer;