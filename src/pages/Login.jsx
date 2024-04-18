import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../styles/Login.css";
import { login } from "../lib/api";

import { useDispatch } from "react-redux";
import { setToken, setRefreshToken } from "../redux/reducers/AuthReducer";

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

//로그인 버튼 그라데이션
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
  const [username, setUsername] = useState(""); // 아이디 상태 변수 추가
  const [password, setPassword] = useState(""); // 비밀번호 상태 변수 추가
  const navigate = useNavigate(); //버전이 바뀌어서 useHistory 아니고 Navigate로

  const dispatch = useDispatch(); //승현 추가

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignupClick = () => {
    // 회원가입 버튼 클릭 시 이벤트 핸들러
    navigate("/signup"); // "/signup" 경로로 이동
  };

  const handleLogin = async () => {
    try {
      // 로그인 요청 보내기
      const response = await login({ username, password });
      //userInfo.user = response.user;

      dispatch(setToken(response.token.access)); //로그인 성공 시 토큰을 redux store에 저장 (승현이 추가)
      dispatch(setRefreshToken(response.token.refresh));
      const message = response.message;
      alert(message);

      navigate("/main");
    } catch (error) {
      console.error("로그인 실패:", error);
      // 로그인 실패 시 처리
      window.alert("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="IDPWTextfield">
      <CenteredContainer className="CenteredContainer">
        <StyledTextField
          id="ID"
          label="ID"
          variant="outlined"
          value={username} // 상태 변수와 연결
          onChange={(e) => setUsername(e.target.value)} // 입력 값 업데이트
        />
        <PasswordInput
          id="Password"
          label="Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={password} // 상태 변수와 연결
          onChange={(e) => setPassword(e.target.value)} // 입력 값 업데이트
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
      
        <GradientButton variant="outlined" onClick={handleLogin}>
          로그인
        </GradientButton>
        <div className="SignupMessage">
          <a style={{ textDecoration: "none", color: "inherit" }}>
            회원이 아니신가요?
          </a>
          <a
            style={{ textDecoration: "underline", cursor: "pointer" }} // cursor 추가
            className="toSignup"
            onClick={handleSignupClick} // 클릭 이벤트 핸들러 연결
          >
            회원가입
          </a>
        </div>
      </CenteredContainer>
    </div>
  );
};

export default Login;
