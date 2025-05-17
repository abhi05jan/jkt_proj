import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBook, fetchSummary, fetchReviews } from "../redux/bookSlice";
import ReviewForm from "../components/ReviewForm";
const BookDetails = () => {
    const { bookId } = useParams();
    const dispatch = useDispatch();
    const { book, summary, reviews, loading } = useSelector((state) => state.books);
    useEffect(() => {
        if (bookId) {
            dispatch(fetchBook(Number(bookId)));
            dispatch(fetchSummary(Number(bookId)));
            dispatch(fetchReviews(Number(bookId)));
        }
    }, [dispatch, bookId]);
    if (loading)
        return _jsx("div", { children: "Loading..." });
    return (_jsx("div", { className: "container mx-auto p-4", children: book && (_jsxs(_Fragment, { children: [_jsx("h1", { className: "text-2xl font-bold", children: book.title }), _jsxs("p", { children: ["Author: ", book.author] }), _jsxs("p", { children: ["Genre: ", book.genre] }), _jsxs("p", { children: ["Year: ", book.year_published] }), _jsxs("p", { children: ["Summary: ", summary?.summary] }), _jsxs("p", { children: ["Average Rating: ", summary?.average_rating] }), _jsx("h2", { className: "text-xl font-bold mt-4", children: "Reviews" }), reviews.map((review) => (_jsxs("div", { className: "border p-2 my-2", children: [_jsx("p", { children: review.review_text }), _jsxs("p", { children: ["Rating: ", review.rating] })] }, review.id))), _jsx(ReviewForm, { bookId: Number(bookId) })] })) }));
};
export default BookDetails;
