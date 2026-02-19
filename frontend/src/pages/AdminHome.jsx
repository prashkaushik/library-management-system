import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminHome() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
  <div className="container">
    <h2>Admin Dashboard</h2>
    <p>Welcome, {user?.name}</p>

    <div className="nav-buttons">
      <button onClick={() => navigate("/admin/books")}>
        Manage Books
      </button>

      <button onClick={() => navigate("/admin/reports")}>
        View Reports
      </button>
      <button onClick={() => navigate("/admin/users")}>
        Manage Users
        </button>
    </div>

    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </div>
);

}

export default AdminHome;
