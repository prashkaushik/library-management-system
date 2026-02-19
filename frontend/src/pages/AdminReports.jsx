import { useEffect, useState } from "react";
import API from "../utils/api";

function AdminReports() {
  const [active, setActive] = useState([]);
  const [overdue, setOverdue] = useState([]);

  const fetchReports = async () => {
    const token = localStorage.getItem("token");

    const activeRes = await API.get("/issues/active", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const overdueRes = await API.get("/issues/overdue", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setActive(activeRes.data);
    setOverdue(overdueRes.data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
      <h2>Admin Reports</h2>

      <h3>Active Issues</h3>
      {active.map((issue) => (
        <div key={issue._id}>
          {issue.bookId.title} - {issue.userId.name}
        </div>
      ))}

      <h3>Overdue Issues</h3>
      {overdue.map((issue) => (
        <div key={issue._id}>
          {issue.bookId.title} - {issue.userId.name}
        </div>
      ))}
    </div>
  );
}

export default AdminReports;
