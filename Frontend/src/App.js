import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook"; // Remove .tsx
import Recommendations from "./pages/Recommendations"; // Remove .tsx
import Login from "./pages/Login"; // Remove .tsx
import Register from "./pages/Register"; // Remove .tsx
const App = () => {
    return (_jsxs(Router, { children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/books/:bookId", element: _jsx(BookDetails, {}) }), _jsx(Route, { path: "/add-book", element: _jsx(AddBook, {}) }), _jsx(Route, { path: "/recommendations", element: _jsx(Recommendations, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) })] })] }));
};
export default App;
