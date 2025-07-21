import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    author: "",
    price: "",
    date: "",
  });

  // ✅ BASE URL
  const BASE_URL = "https://crud-app-backend-jade.vercel.app";

  // ✅ FETCH BOOKS (READ)
  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/books`);
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ HANDLE FORM INPUT
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ HANDLE FORM SUBMIT (CREATE & UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${BASE_URL}/api/books/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(`${BASE_URL}/api/books`, formData);
      }

      setFormData({
        name: "",
        title: "",
        author: "",
        price: "",
        date: "",
      });

      fetchBooks();
    } catch (err) {
      console.error("Error submitting book:", err);
    }
  };

  // ✅ HANDLE EDIT
  const handleEdit = (book) => {
    setEditId(book._id);
    setFormData({
      name: book.name,
      title: book.title,
      author: book.author,
      price: book.price,
      date: book.date,
    });
  };

  // ✅ HANDLE DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 px-5 py-10">
      {/* ---------- FORM ---------- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-6xl mx-auto space-y-5 mb-10"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          {editId ? "Update Book Details" : "Add Book Details"}
        </h2>

        <div className="grid grid-cols-5 gap-4">
          {["name", "title", "author", "price", "date"].map((field) => (
            <div key={field} className="col-span-1">
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 mb-1 capitalize"
              >
                {field === "price"
                  ? "Selling Price"
                  : field === "date"
                  ? "Publish Date"
                  : `Book ${field}`}
              </label>
              <input
                type={field === "date" ? "date" : "text"}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="col-span-5">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              {editId ? "Update Book" : "Add Book"}
            </button>
          </div>
        </div>
      </form>

      {/* ---------- TABLE ---------- */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-6xl mx-auto overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-700 uppercase tracking-wider">
              <th className="px-4 py-2">Book Name</th>
              <th className="px-4 py-2">Book Title</th>
              <th className="px-4 py-2">Author</th>
              <th className="px-4 py-2">Selling Price</th>
              <th className="px-4 py-2">Publish Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr
                  key={book._id || index}
                  className={`text-gray-700 ${
                    index % 2 === 1 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="px-4 py-2">{book.name}</td>
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">₹{book.price}</td>
                  <td className="px-4 py-2">{book.date}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-200 hover:bg-red-300 text-red-800 p-2 rounded"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
