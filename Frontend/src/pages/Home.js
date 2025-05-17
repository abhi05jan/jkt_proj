import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../redux/bookSlice";
import BookCard from "../components/BookCard";
const Home = () => {
    const dispatch = useDispatch();
    const { books, loading } = useSelector((state) => state.books);
    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);
    if (loading)
        return _jsx("div", { children: "Loading..." });
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Books" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: books.map((book) => (_jsx(BookCard, { book: book }, book.id))) })] }));
};
export default Home;
