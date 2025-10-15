import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <nav className="flex items-center justify-between px-6 py-4 text-white bg-blue-900">
      <div className="flex items-center gap-2">
        <img src="/images/note.png" alt="logo" className="w-8 h-8" />
        <h1 className="text-2xl font-semibold">Taskflow</h1>
      </div>
      <ul className="flex gap-6 text-lg">
        <li>
          <Link to="/" className="hover:text-gray-200 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-200 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-gray-200 transition-colors">
            Contact us
          </Link>
        </li>
      </ul>
      <button
        onClick={handleLoginClick}
        className="bg-white text-blue-900 px-4 py-2 rounded-lg font-medium cursor-pointer"
      >
        Sign in
      </button>
    </nav>
  );
};

export default Navbar;
