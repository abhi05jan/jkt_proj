import { Link } from "react-router-dom";

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    year_published: number;
}

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
    return (
        <div className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Year: {book.year_published}</p>
            <Link to={`/books/${book.id}`} className="text-blue-500">View Details</Link>
        </div>
    );
};

export default BookCard;