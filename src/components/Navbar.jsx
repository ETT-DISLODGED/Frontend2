import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";

const Navbar = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <nav>
      <li className="logo-item">
        <Link to="/Main">
          <img src="/assets/logo.png" alt="Logo" className="logo" />
        </Link>
      </li>

      <ul className="navbar-list">
        <ul className="nav-border">
          <li>
            <Link to="/forum">게시판</Link>
          </li>
          <li>
            <Link to="/myvoice">나만의보이스</Link>
          </li>
          <li>
            <a
              href="#howToUseSection"
              onClick={() => scrollToSection("howToUseSection")}
            >
              사용법
            </a>
          </li>
          <li>
            <a
              href="#aboutUsSection"
              onClick={() => scrollToSection("aboutUsSection")}
            >
              About us
            </a>
          </li>
        </ul>
        <div className="button-container">
          <div className="LoginButton">
            <Button
              variant="outlined"
              style={{ bottom: "6px" }}
              onClick={navigateToLogin}
            >
              로그인
            </Button>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;

export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
};
