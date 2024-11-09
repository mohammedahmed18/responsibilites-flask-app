import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar fixed inset-x-0 bg-zinc-900 text-white shadow-sm z-50 backdrop-blur drop-shadow-lg py-3">
            <div className="container mx-auto">
                <Link to="/" className="text-md md:text-xl font-bold">
                    Commitments App
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;