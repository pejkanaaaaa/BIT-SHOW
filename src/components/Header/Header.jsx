import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // Redirect to homepage
  };

  return (
    <header>
      <h1 className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        BIT Show
      </h1>
      <SearchBar />
    </header>
  );
};
