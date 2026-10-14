
import React, { useState } from "react";

function LiveSearch() {
  const [search, setSearch] = useState("");

  const names = [
    "Aman", "Rahul", "Ujjawal", "Priya",
    "Neha", "Rohit", "Ankit", "Simran"
  ];

  const filteredNames = names.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Live Search</h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search a name"
      />

      {filteredNames.length > 0 ? (
        <ul>
          {filteredNames.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default LiveSearch;

