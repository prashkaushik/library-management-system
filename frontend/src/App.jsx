import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminBooks from "./pages/AdminBooks";
import UserBooks from "./pages/UserBooks";
import UserIssues from "./pages/UserIssues";
import AdminReports from "./pages/AdminReports";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminHome />
          </ProtectedRoute>
        }
      />


        <Route
        path="/admin/books"
        element={
          <ProtectedRoute role="admin">
            <AdminBooks />
          </ProtectedRoute>
        }
      />
      <Route
      path="/admin/reports"
      element={
        <ProtectedRoute role="admin">
          <AdminReports />
        </ProtectedRoute>
      }
    />
    <Route
  path="/admin/users"
  element={
    <ProtectedRoute role="admin">
      <AdminUsers />
    </ProtectedRoute>
  }
/>



        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route
        path="/user/books"
        element={
          <ProtectedRoute role="user">
            <UserBooks />
          </ProtectedRoute>
        }
      />
      <Route
      path="/user/issues"
      element={
        <ProtectedRoute role="user">
          <UserIssues />
        </ProtectedRoute>
      }
    />


      </Routes>
    </Router>
  );
}

export default App;
