import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // what user types
  const [searchTerm, setSearchTerm] = useState(""); // when "search" is clicked
  const [selectedUser, setSelectedUser] = useState();

  const baseUrl = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(baseUrl);
        const data = await response.data;
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []);

  function handleSearch() {
    setSearchTerm(searchInput.trim());

    if (searchInput.trim() === "") {
      setSelectedUser(null); // clear selected user if input is empty
    }
  }

  const filteredUsers = users.filter((user) =>
    searchTerm === ""
      ? true
      : user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleUserClick = (user) => {
    setSelectedUser(user); // Always set selected user when clicked
  };

  return (
    <div className="App">
      <h1>User Search</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{ padding: "8px", marginRight: "8px" }}
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ marginTop: "20px" }}>
        {filteredUsers.map((user) => (
          <div key={user.id} onClick={() => handleUserClick(user)}>
            <p
              style={{
                textAlign: "left",
                marginLeft: "5px",
                cursor: "pointer",
              }}
            >
              {user.name}
            </p>
          </div>
        ))}

        {filteredUsers.length === 0 && <p>No users found.</p>}

        {searchTerm !== "" && selectedUser && (
          <div
            style={{
              marginTop: "20px",
              textAlign: "right",
              marginLeft: "5px",
            }}
          >
            <h3>User Detail</h3>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
