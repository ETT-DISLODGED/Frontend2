import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../styles/Login.css";

const CenteredContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
});

const inputStyles = {
  width: "400px",
  margin: "15px",
  "& .MuiOutlinedInput-input": {
    color: "white" // Set text color to white
  },
  "& .MuiInputLabel-root": {
    color: "white" // Set hint label color to white
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
      borderWidth: "1.5px"
    },
    "&:hover fieldset": {
      borderColor: "#504ABF"
    },
    "&.Mui-focused fieldset": {
      borderColor: "white"
    },
    "& .MuiSvgIcon-root": {
      color: "white" // Set icon color to white
    }
  }
};

const GradientButton = styled(Button)({
  marginTop: "20px",
  width: "400px",
  padding: "15px", // Adjust padding as needed
  color: "white",
  background: "linear-gradient(45deg, #FF0A99 30%, #00FFF0 90%)", // Gradient effect
  "&:hover": {
    background: "linear-gradient(45deg, #FF0A99 60%, #00FFF0 90%)"
  },
  "&:active, &:focus": {
    outline: "none" // Remove outline on click/focus
  }
});

const StyledTextField = styled(TextField)(inputStyles);
const PasswordInput = styled(TextField)(inputStyles);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="IDPWTextfield">
      <CenteredContainer className="CenteredContainer">
        <StyledTextField id="ID" label="ID" variant="outlined" />
        <PasswordInput
          id="Password"
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <GradientButton variant="outlined">로그인</GradientButton>
        <div className="SignupMessage">
          <a style={{ textDecoration: "none", color: "inherit" }}>
            회원이 아니신가요?
          </a>
          <a
            style={{ textDecoration: "underline" }}
            className="toSignup"
            href="/signup"
          >
            회원가입
          </a>
        </div>
      </CenteredContainer>
    </div>
  );
};

export default Login;
