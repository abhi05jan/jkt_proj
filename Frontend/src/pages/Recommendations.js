import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendations } from "../redux/bookSlice";
import BookCard from "../components/BookCard";
const Recommendations = () => {
    const dispatch = useDispatch();
    const { books, loading } = useSelector((state) => state.books);
    const [genre, setGenre] = useState("");
    useEffect(() => {
        dispatch(fetchRecommendations(genre));
    }, [dispatch, genre]);
    const handleGenreChange = (e) => {
        setGenre(e.target.value);
    };
    if (loading)
        return _jsx("div", { children: "Loading..." });
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Book Recommendations" }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Filter by Genre" }), _jsx("input", { type: "text", value: genre, onChange: handleGenreChange, className: "w-full max-w-xs p-2 border rounded", placeholder: "Enter genre (e.g., Fiction)" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: books.map((book) => (_jsx(BookCard, { book: book }, book.id))) })] }));
};
export default Recommendations;
