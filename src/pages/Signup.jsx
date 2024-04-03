import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../styles/Login.css";
import { signUp } from '../lib/api';

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


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    email: "",
    gender: "남",
    age: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // name이 confirmPassword인 입력필드 
    // 비밀번호 확인란에 입력이 변경될 때마다 일치 여부 확인
    if (name === "confirmPassword") {
      if (formData.password !== value) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

  const handleSignup = async () => {
    try {
      // 회원가입 데이터
      const userData = {
        username: formData.id,
        password: formData.password,
        email: formData.email,
        nickname: formData.nickname,
        gender: formData.gender,
        age: parseInt(formData.age)
      };
      
      // 회원가입 요청 보내기
      const response = await signUp(userData);
      
      // 회원가입 성공 시 처리
      console.log('회원가입 성공:', response);
      
      // 성공적으로 회원가입되었다는 메시지 표시 등의 처리
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      // 회원가입 실패 시 처리
      console.error('회원가입 실패:', error);
      
      // 회원가입 실패 메시지 표시 등의 처리
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 모든 정보가 작성되었는지 확인
    if (
      formData.id &&
      formData.password &&
      formData.confirmPassword &&
      formData.nickname &&
      formData.email &&
      formData.age
    ) {
      // 회원가입 처리
      handleSignup(); //서버에 데이터 전송할 함수 호출
    } else {
      alert("모든 정보를 입력해주세요.");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="SignUpTextfield">
      <CenteredContainer className="CenteredContainer">
        <StyledTextField
          style={inputStyles}
          id="ID"
          name="id"
          label="아이디"
          variant="outlined"
          value={formData.id}
          onChange={handleChange}
          inputProps={{ maxLength: 20 }} // 최대 길이 설정
        />
        <PasswordInput
          style={inputStyles}
          id="Password"
          name="password"
          label="비밀번호"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          inputProps={{ minLength: 8 }} // 최소 길이 설정
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
        <PasswordInput
          style={inputStyles}
          id="confirmPassword"
          name="confirmPassword"
          label="비밀번호 확인"
          variant="outlined"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          inputProps={{ minLength: 8 }} 
         />
          {passwordError && ( // 비밀번호 일치 오류가 있을 때만 표시
                    <p style={{ color: "hotpink", fontSize: "14px"  }}>비밀번호가 일치하지 않습니다. 다시 확인해주세요.</p>
                )}
        <StyledTextField
          style={inputStyles}
          id="nickname"
          name="nickname"
          label="닉네임"
          variant="outlined"
          value={formData.nickname}
          onChange={handleChange}
          inputProps={{ maxLength: 8 }} // 최대 길이 수정 -> 8자
        />

        
        <StyledTextField
          style={inputStyles}
          id="email"
          name="email"
          label="이메일"
          variant="outlined"
          type="email"
          value={formData.email}
          onChange={handleChange}// 이메일 형식에 맞을 때만 입력되는 코드 넣기
        />

        <StyledTextField
          style={inputStyles}
          id="age"
          name="age"
          label="나이"
          variant="outlined"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />
        <RadioGroup
          style={{ flexDirection: "row" }}
          aria-label="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <FormControlLabel value="남" control={<Radio />} label="Male" />
          <FormControlLabel value="여" control={<Radio />} label="Female" />
        </RadioGroup>
        <GradientButton variant="outlined" onClick={handleSubmit}>
          회원가입 완료
        </GradientButton>
        <div className="SignupMessage">
          <a style={{ textDecoration: "none", color: "inherit" }}>
            이미 회원이신가요?
          </a>
          <a
            style={{ textDecoration: "underline", cursor: "pointer" }} // cursor 추가
            className="toLogin"
            onClick={() => navigate("/login")} // 클릭 이벤트 핸들러 연결
          >
            로그인
          </a>
        </div>
      </CenteredContainer>
    </div>
  );
};

export default Signup;
