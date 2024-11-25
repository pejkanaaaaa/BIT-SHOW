import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowInfoPage.css"

export const ShowInfoPage = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [akas, setAkas] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch(`http://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => setShow(data))
      .catch((error) => console.log("Fetch error (show):", error));

    fetch(`http://api.tvmaze.com/shows/${id}/seasons`)
      .then((res) => res.json())
      .then((data) => setSeasons(data))
      .catch((error) => console.log("Fetch error (seasons):", error));

    fetch(`http://api.tvmaze.com/shows/${id}/cast`)
      .then((res) => res.json())
      .then((data) => setCast(data))
      .catch((error) => console.log("Fetch error (cast):", error));

    fetch(`http://api.tvmaze.com/shows/${id}/crew`)
      .then((res) => res.json())
      .then((data) => setCrew(data))
      .catch((error) => console.log("Fetch error (crew):", error));

    fetch(`http://api.tvmaze.com/shows/${id}/akas`)
      .then((res) => res.json())
      .then((data) => setAkas(data))
      .catch((error) => console.log("Fetch error (akas):", error));

    fetch(`http://api.tvmaze.com/shows/${id}/episodes`)
      .then((res) => res.json())
      .then((data) => setEpisodes(data))
      .catch((error) => console.log("Fetch error (episodes):", error));
  }, [id]);

  if (!show) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>;
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "16px", color: "#333" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", margin: "0.5rem", color:"white", paddingBottom:"20px" }}>{show.name}</h1>
        <img
  src={show.image?.original || "https://via.placeholder.com/300"}
  alt={show.name}
  style={{
    width: "80%",
    maxWidth: "600px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    border: "4px solid transparent",
    backgroundImage:
      "linear-gradient(white, white), linear-gradient(45deg, #ff9a9e, #fad0c4)",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.5)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
  }}
  
        />
        <div
          dangerouslySetInnerHTML={{ __html: show.summary }}
          style={{
            fontSize: "1.2rem",
            margin: "1rem 0",
            lineHeight: "1.8",
            textAlign: "justify",
          }}
        ></div>
      </div>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5rem" }}>Seasons</h2>
        {seasons.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {seasons.map((season) => (
              <div
                key={season.id}
                style={{
                  flex: "1 1 calc(25% - 16px)",
                  background: "#f4f4f4",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <h4 style={{ fontSize: "1rem" }}>Season {season.number}</h4>
                <p>
                  <strong>Start:</strong> {season.premiereDate || "Unknown"}
                </p>
                <p>
                  <strong>End:</strong> {season.endDate || "Ongoing"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No seasons available.</p>
        )}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5rem" }}>Cast</h2>
        {cast.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {cast.map((member) => (
              <div
                key={member.person.id}
                style={{
                  flex: "1 1 calc(20% - 16px)",
                  textAlign: "center",
                }}
              >
                <img
                  src={
                    member.person.image?.medium ||
                    "https://via.placeholder.com/150"
                  }
                  alt={member.person.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginBottom: "0.5rem",
                  }}
                />
                <p>
                  <strong>{member.person.name}</strong>
                </p>
                <p style={{ fontSize: "0.9rem", color: "#666" }}>
                  {member.character?.name || "Unknown Role"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No cast information available.</p>
        )}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5rem" }}>Episodes</h2>
        {episodes.length > 0 ? (
          <ul style={{ padding: "0", listStyleType: "none" }}>
            {episodes.slice(0, 5).map((episode) => (
              <li
                key={episode.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "1rem",
                  alignItems: "center",
                }}
              >
                <img
                  src={episode.image?.medium || "https://via.placeholder.com/100"}
                  alt={episode.name}
                  style={{
                    width: "100px",
                    borderRadius: "8px",
                  }}
                />
                <div>
                  <h4 style={{ margin: "0 0 0.5rem" }}>
                    S{episode.season}E{episode.number}: {episode.name}
                  </h4>
                  <p style={{ fontSize: "0.9rem", color: "#666" }}>
                    Airdate: {episode.airdate || "Unknown"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No episodes available.</p>
        )}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5rem" }}>Crew</h2>
        {crew.length > 0 ? (
          <ul style={{ padding: "0", listStyleType: "none" }}>
            {crew.slice(0, 10).map((member) => (
              <li key={member.person.id} style={{ marginBottom: "0.5rem" }}>
                {member.person.name} ({member.type})
              </li>
            ))}
          </ul>
        ) : (
          <p>No crew information available.</p>
        )}
      </section>

      <section>
        <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "0.5rem" }}>AKA's</h2>
        {akas.length > 0 ? (
          <ul>
            {akas.map((aka, index) => (
              <li key={index}>{aka.name}</li>
            ))}
          </ul>
        ) : (
          <p>No alternate names available.</p>
        )}
      </section>
    </div>
  );
};
