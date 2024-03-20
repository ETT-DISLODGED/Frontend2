import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";

const Navbar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToMyPage = () => {
    navigate("/mypage");
  };

  return (
    <nav>
      <div className="logo-item">
        <Link to="/Main">
          <img src="/assets/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>

      <ul className="navbar-list">
        <ul className="nav-border">
          <li>
            <Link to="/forum">게시판</Link>
          </li>
          <li>
            <Link to="/myvoice">나만의보이스</Link>
          </li>
          
  
        </ul>
    
      <div className="button-container">
        {isLoggedIn ? (
          <div className="ProfileButton" onClick={navigateToMyPage}>
            <PersonIcon sx={{ fontSize: 34, color: 'white' }} />
          </div>
        ) : (
          <div className="LoginButton">
            <Button
              variant="outlined" 
              style={{ bottom: "6px" }}
              onClick={navigateToLogin}
            >
              로그인
            </Button>
          </div>
        )}
      </div>
      </ul>
    </nav>
  );
};

export default Navbar;
