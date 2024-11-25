import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Fetch TV shows from TVMaze API
  const fetchShows = async (searchQuery) => {
    if (searchQuery.length < 3) {
      setOptions([]); // Clear options for short inputs
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${searchQuery}`
      );
      const data = await response.json();
      const formattedData = data
        .slice(0, 10) // Limit results to 10
        .map((item) => ({
          id: item.show.id,
          title: item.show.name,
          image: item.show.image?.medium || "",
        }));
      setOptions(formattedData);
      setShowDropdown(true); // Show dropdown with results
    } catch (error) {
      console.error("Error fetching shows:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value) {
      fetchShows(value);
    } else {
      setOptions([]); // Clear options if input is empty
      setShowDropdown(false);
    }
  };

  // Handle show selection
  const handleShowSelection = (id) => {
    navigate(`/show/${id}`); // Redirect to Show Info Page
    setShowDropdown(false); // Close dropdown
    setQuery(""); // Clear input
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for shows..."
        className="search-input"
      />
      {loading && <div className="loading-spinner">Loading...</div>}
      {showDropdown && options.length > 0 && (
        <ul className="dropdown">
          {options.map((option) => (
            <li
              key={option.id}
              className="dropdown-item"
              onClick={() => handleShowSelection(option.id)}
            >
              {option.image && (
                <img
                  src={option.image}
                  alt={option.title}
                  className="dropdown-image"
                />
              )}
              <span>{option.title}</span>
            </li>
          ))}
        </ul>
      )}
      {showDropdown && options.length === 0 && !loading && (
        <div className="no-results">No shows found</div>
      )}
    </div>
  );
}
