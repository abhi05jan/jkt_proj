import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../redux/bookSlice";
import { useNavigate } from "react-router-dom";
const AddBook = () => {
    const dispatch = useDispatch();
    const { token, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        year_published: 0,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "year_published" ? Number(value) : value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            navigate("/login");
            return;
        }
        await dispatch(createBook(formData));
        navigate("/");
    };
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Add New Book" }), _jsxs("form", { onSubmit: handleSubmit, className: "max-w-md mx-auto", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Title" }), _jsx("input", { type: "text", name: "title", value: formData.title, onChange: handleChange, className: "w-full p-2 border rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Author" }), _jsx("input", { type: "text", name: "author", value: formData.author, onChange: handleChange, className: "w-full p-2 border rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Genre" }), _jsx("input", { type: "text", name: "genre", value: formData.genre, onChange: handleChange, className: "w-full p-2 border rounded" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Year Published" }), _jsx("input", { type: "number", name: "year_published", value: formData.year_published, onChange: handleChange, className: "w-full p-2 border rounded" })] }), _jsx("button", { type: "submit", disabled: loading, className: "bg-blue-500 text-white p-2 rounded w-full", children: loading ? "Adding..." : "Add Book" })] })] }));
};
export default AddBook;
