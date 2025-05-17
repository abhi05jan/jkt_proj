import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser(formData));
        if (loginUser.fulfilled.match(result)) {
            navigate("/");
        }
    };
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Login" }), _jsxs("form", { onSubmit: handleSubmit, className: "max-w-md mx-auto", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Username" }), _jsx("input", { type: "text", name: "username", value: formData.username, onChange: handleChange, className: "w-full p-2 border rounded", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Password" }), _jsx("input", { type: "password", name: "password", value: formData.password, onChange: handleChange, className: "w-full p-2 border rounded", required: true })] }), error && _jsx("p", { className: "text-red-500", children: error }), _jsx("button", { type: "submit", disabled: loading, className: "bg-blue-500 text-white p-2 rounded w-full", children: loading ? "Logging in..." : "Login" })] })] }));
};
export default Login;
