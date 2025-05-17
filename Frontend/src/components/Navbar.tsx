import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { RootState } from "../redux/store";

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.auth);

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-white text-lg font-bold">Book Management</Link>
                <div>
                    <Link to="/" className="text-white mx-2">Home</Link>
                    <Link to="/recommendations" className="text-white mx-2">Recommendations</Link>
                    {token ? (
                        <>
                            <Link to="/add-book" className="text-white mx-2">Add Book</Link>
                            <button onClick={() => dispatch(logout())} className="text-white mx-2">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white mx-2">Login</Link>
                            <Link to="/register" className="text-white mx-2">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;