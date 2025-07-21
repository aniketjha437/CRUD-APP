import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold">📚 BookManager</div>
      <ul className="flex gap-6 text-sm font-medium">
        <li>
          <Link to="/view" className="hover:text-blue-400">
            View Books
          </Link>
        </li>
        <li>
          <Link to="/add" className="hover:text-blue-400">
            Add Book
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
