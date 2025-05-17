import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchRecommendations } from "../redux/bookSlice";
import BookCard from "../components/BookCard";

const Recommendations: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { books, loading } = useSelector((state: RootState) => state.books);
    const [genre, setGenre] = useState("");

    useEffect(() => {
        dispatch(fetchRecommendations(genre));
    }, [dispatch, genre]);

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGenre(e.target.value);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Book Recommendations</h1>
            <div className="mb-4">
                <label className="block text-gray-700">Filter by Genre</label>
                <input
                    type="text"
                    value={genre}
                    onChange={handleGenreChange}
                    className="w-full max-w-xs p-2 border rounded"
                    placeholder="Enter genre (e.g., Fiction)"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Recommendations;