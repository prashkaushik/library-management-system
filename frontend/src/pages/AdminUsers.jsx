import { useEffect, useState } from "react";
import API from "../utils/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [memberships, setMemberships] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const usersRes = await API.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const memRes = await API.get("/memberships", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUsers(usersRes.data);
    setMemberships(memRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (userId, membershipId) => {
    await API.put(
      `/users/${userId}/membership`,
      { membershipId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchData();
  };

  return (
    <div className="container">
      <h2>Manage Users</h2>

      {users.map((user) => (
        <div key={user._id} className="card">
          <div>
            {user.name} - {user.role}
            <br />
            Membership: {user.membership?.type || "None"}
          </div>

          <select
            onChange={(e) => handleChange(user._id, e.target.value)}
            value={user.membership?._id || ""}
          >
            <option value="">Select Membership</option>
            {memberships.map((m) => (
              <option key={m._id} value={m._id}>
                {m.type}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default AdminUsers;
