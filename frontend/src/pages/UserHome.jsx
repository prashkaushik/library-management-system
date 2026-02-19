import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function UserHome() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
  <div className="container">
    <h2>User Dashboard</h2>
    <p>Welcome, {user?.name}</p>

    <div className="nav-buttons">
      <button onClick={() => navigate("/user/books")}>
        View Books
      </button>

      <button onClick={() => navigate("/user/issues")}>
        My Issued Books
      </button>
    </div>

    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  </div>
);

}

export default UserHome;
