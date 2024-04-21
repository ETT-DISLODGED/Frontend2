import React from "react";
import { Link } from "react-router-dom";
import "../styles/Main.css";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import mouseImage from "/assets/mouse.png"; // 이미지 경로를 import 합니다.

const Container = styled("div")({
  display: "flex",
  alignItems: "center",
});

const GradientButton = styled(Button)({
  marginTop: "20px",
  width: "200px",
  padding: "10px",
  color: "white",
  background: "linear-gradient(45deg, #FF0A99 30%, #00FFF0 90%)",
  "&:hover": {
    background: "linear-gradient(45deg, #FF0A99 60%, #00FFF0 90%)"
  },
  "&:active, &:focus": {
    outline: "none"
  },
  fontFamily: "hanbit-font",
});

const MouseImage = styled("img")({
  marginLeft: "7px", // 이미지와 버튼 사이 간격 조절
  width: "20px", // 이미지의 너비 조절
  marginTop:"50px"
});

const Main = () => {
  return (
    <div className="section section1">
      <div className="main-container">
        <Container>
          
          <GradientButton variant="outlined">
            서비스 사용법 보러가기
          </GradientButton>
          <MouseImage src={mouseImage} alt="mouse" /> {/* 이미지를 추가합니다. */}
        </Container>
      </div>
    </div>
  );
};

export default Main;
