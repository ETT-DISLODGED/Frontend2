import React from "react";
import { Link } from "react-router-dom";
import "../styles/Main.css";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import mouseImage from "/assets/mouse.png";
import Dialog from "@mui/material/Dialog"; //모달용
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Container = styled("div")({
  display: "flex",
  alignItems: "center"
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
  fontFamily: "hanbit-font"
});

const MouseImage = styled("img")({
  marginLeft: "7px", // 이미지와 버튼 사이 간격 조절
  width: "20px", // 이미지의 너비 조절
  marginTop: "50px"
});

const Main = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="section section1">
      <div className="main-container">
        <Container>
          <GradientButton variant="outlined" onClick={handleClickOpen}>
            서비스 사용법 보러가기
          </GradientButton>
          <MouseImage src={mouseImage} alt="mouse" />
          <Dialog open={open} onClose={handleClose}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent style={{ fontSize: "14px" }}>
              <h4
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "5px"
                }}
              >
                What is DISLODGED?
              </h4>
              DISLODGED는 ‘본인만의 가상보이스’로 생성된 여러 사람들의 보이스
              위로들을 모아 하나의 음악처럼 들려주는 감성 웹 서비스입니다.
              <br></br>
              <h4
                style={{
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "5px"
                }}
              >
                How to use?
              </h4>
              1.회원가입 및 로그인을 진행한다.<br></br>
              2.'게시판' 페이지에 접속해 고민글과 댓글을 읽고 들어본다.<br></br>
              3.'나만의보이스' 페이지에 접속해 직접 요소들을 조절하여 나의
              가상보이스를 만든다. <br></br>
              *보이스 추천을 받고 싶다면, 목소리가 마음에 드는 댓글들에 좋아요를
              눌러보세요!<br></br>
              4.마이페이지에 접속해 내가 작성한 게시글들을 앨범형태로 확인한다.
              <br></br>
              5.각 앨범을 눌러 게시글 본문으로 접속하거나, 내 글에 달린
              보이스댓글들을 모아 듣는다.<br></br>
              *제공되는 BGM을 선택하여 댓글들과 함께 진짜 음악처럼 들어보세요!
              <br></br>
            </DialogContent>
          </Dialog>
        </Container>
      </div>
    </div>
  );
};

export default Main;
