import { useEffect, useState } from "react";
import API from "../utils/api";

function UserBooks() {
  const [books, setBooks] = useState([]);
  const [returnDate, setReturnDate] = useState("");

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

  const handleIssue = async (bookId) => {
  if (!returnDate) {
    alert("Please select return date");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    await API.post(
      "/issues",
      { bookId, returnDate },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("Book Issued Successfully!");
    fetchBooks();

  } catch (error) {
    alert(error.response?.data?.message || "Issue failed");
  }
};


  return (
    <div>
      <h2>Available Books</h2>

      <input
        type="date"
        onChange={(e) => setReturnDate(e.target.value)}
      />
      <br /><br />

      {books.map((book) => (
        <div key={book._id}>
          {book.title} - {book.author} ({book.availableCopies})
          {book.availableCopies > 0 && (
            <button onClick={() => handleIssue(book._id)}>
              Issue
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserBooks;
