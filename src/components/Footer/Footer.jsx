import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">
          © {currentYear} PokéAPI Frontend. Data provided by PokéAPI.
        </p>
        <div className="footer__links">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <Link to="/data" className="footer__link">
            Pokémon Data
          </Link>
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            PokéAPI
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
