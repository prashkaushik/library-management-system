import { useEffect, useState } from "react";
import API from "../utils/api";

function UserIssues() {
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    const token = localStorage.getItem("token");

    const { data } = await API.get("/issues/my-issues", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setIssues(data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleReturn = async (id) => {
    const token = localStorage.getItem("token");

    await API.put(`/issues/return/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Book Returned");
    fetchIssues();
  };
  const handlePay = async (id) => {
  const token = localStorage.getItem("token");

  await API.put(`/issues/pay-fine/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

  alert("Fine Paid");
  fetchIssues();
};

  return (
    <div>
      <h2>My Issued Books</h2>

      {issues.map((issue) => (
        <div key={issue._id}>
          {issue.bookId.title} - Status: {issue.status}
          {issue.status === "issued" && (
            <button onClick={() => handleReturn(issue._id)}>
              Return
            </button>
          )}
          {issue.status === "returned" && (
        <>
            <span> | Fine: ₹{issue.fine}</span>

            {issue.fine > 0 && !issue.finePaid && (
            <button onClick={() => handlePay(issue._id)}>
                Pay Fine
            </button>
            )}

            {issue.finePaid && <span> | Fine Paid</span>}
        </>
        )}
        </div>
      ))}
    </div>
  );
}

export default UserIssues;
