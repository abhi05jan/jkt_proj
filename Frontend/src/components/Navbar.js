import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/authSlice";
const Navbar = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    return (_jsx("nav", { className: "bg-gray-800 p-4", children: _jsxs("div", { className: "container mx-auto flex justify-between", children: [_jsx(Link, { to: "/", className: "text-white text-lg font-bold", children: "Book Management" }), _jsxs("div", { children: [_jsx(Link, { to: "/", className: "text-white mx-2", children: "Home" }), _jsx(Link, { to: "/recommendations", className: "text-white mx-2", children: "Recommendations" }), token ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/add-book", className: "text-white mx-2", children: "Add Book" }), _jsx("button", { onClick: () => dispatch(logout()), className: "text-white mx-2", children: "Logout" })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", className: "text-white mx-2", children: "Login" }), _jsx(Link, { to: "/register", className: "text-white mx-2", children: "Register" })] }))] })] }) }));
};
export default Navbar;
