import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createBook } from "../redux/bookSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast

const AddBook: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token, loading } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        year_published: 0,
    });

    const [errors, setErrors] = useState({
        title: "",
        author: "",
        year_published: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValue = name === "year_published" ? Number(value) : value;

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
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
        if (name === "year_published") {
            const year = Number(value);
            setErrors((prev) => ({
                ...prev,
                year_published:
                    year < 1000 || year > new Date().getFullYear() ? "Enter a valid year (1000 - current year)" : "",
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            toast.error("Please log in to add a book");
            navigate("/login");
            return;
        }
        if (errors.title || errors.author || errors.year_published) {
            toast.error("Please fix the form errors");
            return;
        }

        try {
            await dispatch(createBook(formData)).unwrap();
            toast.success("Book added successfully!");
            navigate("/");
        } catch (error) {
            toast.error("Failed to add book");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${errors.title ? "border-red-500" : "border-gray-300"
                            }`}
                        required
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                <div>
                    <label className="block text-gray-700">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${errors.author ? "border-red-500" : "border-gray-300"
                            }`}
                        required
                    />
                    {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
                </div>
                <div>
                    <label className="block text-gray-700">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full p-2 border rounded border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Year Published</label>
                    <input
                        type="number"
                        name="year_published"
                        value={formData.year_published}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${errors.year_published ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.year_published && (
                        <p className="text-red-500 text-sm mt-1">{errors.year_published}</p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={loading || !!errors.title || !!errors.author || !!errors.year_published}
                    className={`w-full p-2 rounded text-white transition-all duration-200 ${loading || errors.title || errors.author || errors.year_published
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                            Adding...
                        </span>
                    ) : (
                        "Add Book"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddBook;