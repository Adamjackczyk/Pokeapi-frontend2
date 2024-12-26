import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  const isActiveRoute = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="header">
      <Link to="/" className="header__title-link">
        <h1 className="header__title">PokéAPI Frontend</h1>
      </Link>
      <nav className="header__nav">
        <Link to="/" className={`header__link ${isActiveRoute("/")}`}>
          Home
        </Link>
        <Link to="/data" className={`header__link ${isActiveRoute("/data")}`}>
          Pokémon Data
        </Link>
      </nav>
    </header>
  );
};

export default Header;
