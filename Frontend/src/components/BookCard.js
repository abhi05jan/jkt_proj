import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const BookCard = ({ book }) => {
    return (_jsxs("div", { className: "border rounded-lg p-4 shadow", children: [_jsx("h2", { className: "text-xl font-bold", children: book.title }), _jsxs("p", { children: ["Author: ", book.author] }), _jsxs("p", { children: ["Genre: ", book.genre] }), _jsxs("p", { children: ["Year: ", book.year_published] }), _jsx(Link, { to: `/books/${book.id}`, className: "text-blue-500", children: "View Details" })] }));
};
export default BookCard;
