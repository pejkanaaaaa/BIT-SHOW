import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const EJPIAJ = "http://api.tvmaze.com/shows";

  useEffect(() => {
    fetch(EJPIAJ)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setData(data.slice(0, 50))) // Limit to the top 50 shows
      .catch((error) => console.log("Fetch error:", error));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/show/${id}`);
  };

  return (
    <><h1 style={{ fontSize: "2.5rem", margin: "0.5rem", textAlign: "center", color:"white", padding:"20px"}}>Popular Shows</h1><div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)", // 5 columns per row
        gap: "16px",
        padding: "16px",
      }}
    >
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        data.map((show) => (
          <div
            key={show.id}
            onClick={() => handleCardClick(show.id)} // Navigate on card click
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              background: "#fff",
            }}
          >
            <img
              src={show.image?.medium || "https://via.placeholder.com/210x295"}
              alt={show.name}
              style={{ width: "100%", height: "auto" }}
            />
            <div style={{ padding: "8px" }}>
              <h3 style={{ fontSize: "1rem", margin: "0.5rem 0" }}>{show.name}</h3>
            </div>
          </div>
        ))
      )}
    </div></>
  );
};
