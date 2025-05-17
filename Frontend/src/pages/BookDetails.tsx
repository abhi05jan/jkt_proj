import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBook, fetchSummary, fetchReviews } from "../redux/bookSlice";
import ReviewForm from "../components/ReviewForm";

const BookDetails: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const { book, summary, reviews, loading } = useSelector((state: RootState) => state.books);

    useEffect(() => {
        if (bookId) {
            dispatch(fetchBook(Number(bookId)));
            dispatch(fetchSummary(Number(bookId)));
            dispatch(fetchReviews(Number(bookId)));
        }
    }, [dispatch, bookId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            {book && (
                <>
                    <h1 className="text-2xl font-bold">{book.title}</h1>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Year: {book.year_published}</p>
                    <p>Summary: {summary?.summary}</p>
                    <p>Average Rating: {summary?.average_rating}</p>
                    <h2 className="text-xl font-bold mt-4">Reviews</h2>
                    {reviews.map((review) => (
                        <div key={review.id} className="border p-2 my-2">
                            <p>{review.review_text}</p>
                            <p>Rating: {review.rating}</p>
                        </div>
                    ))}
                    <ReviewForm bookId={Number(bookId)} />
                </>
            )}
        </div>
    );
};

export default BookDetails;