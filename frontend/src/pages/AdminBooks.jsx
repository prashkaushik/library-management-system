import { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";

function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    serialNumber: "",
    totalCopies: "",
    availableCopies: "",
  });

  const { user } = useContext(AuthContext);

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");

    const { data } = await API.get("/books", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await API.post("/books", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchBooks();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await API.delete(`/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchBooks();
  };

  return (
    <div>
      <h2>Manage Books</h2>

      <form onSubmit={handleAdd}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="author" placeholder="Author" onChange={handleChange} />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <input name="serialNumber" placeholder="Serial No" onChange={handleChange} />
        <input name="totalCopies" placeholder="Total Copies" onChange={handleChange} />
        <input name="availableCopies" placeholder="Available Copies" onChange={handleChange} />
        <button type="submit">Add Book</button>
      </form>

      <hr />

      <h3>Book List</h3>
      {books.map((book) => (
        <div key={book._id} className="card">
          {book.title} - {book.author} ({book.availableCopies})
          <button onClick={() => handleDelete(book._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminBooks;
