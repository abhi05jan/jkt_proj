import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register/", formData); // Adjust endpoint as per backend
            navigate("/login");
        }
        catch (err) {
            setError("Registration failed. Please try again.");
        }
    };
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Register" }), _jsxs("form", { onSubmit: handleSubmit, className: "max-w-md mx-auto", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Username" }), _jsx("input", { type: "text", name: "username", value: formData.username, onChange: handleChange, className: "w-full p-2 border rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Email" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, className: "w-full p-2 border rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Password" }), _jsx("input", { type: "password", name: "password", value: formData.password, onChange: handleChange, className: "w-full p-2 border rounded", required: true })] }), error && _jsx("p", { className: "text-red-500", children: error }), _jsx("button", { type: "submit", className: "bg-blue-500 text-white p-2 rounded w-full", children: "Register" })] })] }));
};
export default Register;
