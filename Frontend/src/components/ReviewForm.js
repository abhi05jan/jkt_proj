import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../redux/bookSlice";
import { useNavigate } from "react-router-dom";
const ReviewForm = ({ bookId }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(1);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate("/login"); // Redirect to login if not authenticated
            return;
        }
        await dispatch(createReview({
            bookId,
            review: { user_id: user.id, review_text: reviewText, rating },
        }));
        setReviewText("");
        setRating(1);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "mt-4", children: [_jsx("textarea", { value: reviewText, onChange: (e) => setReviewText(e.target.value), className: "w-full p-2 border", placeholder: "Write your review..." }), _jsx("select", { value: rating, onChange: (e) => setRating(Number(e.target.value)), className: "p-2 border", children: [1, 2, 3, 4, 5].map((r) => (_jsx("option", { value: r, children: r }, r))) }), _jsx("button", { type: "submit", className: "bg-blue-500 text-white p-2 rounded", children: "Submit Review" })] }));
};
export default ReviewForm;
