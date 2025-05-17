import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchBooks } from "../redux/bookSlice";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { books, loading } = useSelector((state: RootState) => state.books);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestion, setSuggestion] = useState({
        title: "",
        author: "",
    });
    const [errors, setErrors] = useState({
        title: "",
        author: "",
    });

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSuggestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSuggestion((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "title") {
            setErrors((prev) => ({
                ...prev,
                title: value.trim().length < 3 ? "Title must be at least 3 characters" : "",
            }));
        }
        if (name === "author") {
            setErrors((prev) => ({
                ...prev,
                author: value.trim().length < 3 ? "Author must be at least 3 characters" : "",
            }));
        }
    };

    const handleSuggestionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (errors.title || errors.author) {
            toast.error("Please fix the form errors");
            return;
        }

        try {
            // Simulate sending suggestion to backend (replace with actual API call if implemented)
            console.log("Suggestion submitted:", suggestion);
            toast.success("Suggestion submitted successfully!");
            setSuggestion({ title: "", author: "" });
            setErrors({ title: "", author: "" });
        } catch (error) {
            toast.error("Failed to submit suggestion");
        }
    };

    if (loading) return <div className="container mx-auto p-4 text-center">Loading...</div>;
    if (!filteredBooks || filteredBooks.length === 0) return <div className="container mx-auto p-4 text-center">No books found</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Dynamic Header */}
            <header className="bg-gray-800 text-white p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Book Management</h1>
                    <div className="space-x-4">
                        <button
                            onClick={() => navigate("/add-book")}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-all duration-200"
                        >
                            Add Book
                        </button>
                        <button
                            onClick={() => navigate("/recommendations")}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-all duration-200"
                        >
                            Recommendations
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto p-4 py-8 animate-fade-in">
                {/* Search Form */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full max-w-md p-2 border rounded border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />
                </div>

                {/* Book Suggestion Form */}
                <div className="mb-6 bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Suggest a Book</h2>
                    <form onSubmit={handleSuggestionSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={suggestion.title}
                                onChange={handleSuggestionChange}
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${errors.title ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={suggestion.author}
                                onChange={handleSuggestionChange}
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${errors.author ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={!!errors.title || !!errors.author}
                            className={`w-full p-2 rounded text-white transition-all duration-200 ${errors.title || errors.author ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                                }`}
                        >
                            Submit Suggestion
                        </button>
                    </form>
                </div>

                {/* Book List */}
                <h2 className="text-2xl font-bold mb-4">Books</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;