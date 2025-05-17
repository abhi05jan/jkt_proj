import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createReview } from "../redux/bookSlice";
import { useNavigate } from "react-router-dom";

const ReviewForm: React.FC<{ bookId: number }> = ({ bookId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            navigate("/login"); // Redirect to login if not authenticated
            return;
        }
        await dispatch(
            createReview({
                bookId,
                review: { user_id: user.id, review_text: reviewText, rating },
            })
        );
        setReviewText("");
        setRating(1);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-2 border"
                placeholder="Write your review..."
            />
            <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="p-2 border"
            >
                {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>{r}</option>
                ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;