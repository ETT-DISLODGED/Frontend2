import React from "react";
import { Link } from "react-router-dom";
import "../styles/Main.css";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import mouseImage from "/assets/mouse.png"; 
import Dialog from '@mui/material/Dialog'; //모달용
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";


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
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent>
              여기에 서비스 사용법을 적어주세요.<br></br>
              여기에 서비스 사용법을 적어주세요.
              여기에 서비스 사용법을 적어주세요.
              여기에 서비스 사용법을 적어주세요.
              여기에 서비스 사용법을 적어주세요.
              여기에 서비스 사용법을 적어주세요.
              여기에 서비스 사용법을 적어주세요.
              여기에 서비스 사용법을 적어주세요.
              여기에 서비스 사용법을 적어주세요.
              여기에 서비스 사용법을 적어주세요.
              여기에 서비스 사용법을 적어주세요.

            </DialogContent>
          </Dialog>
        </Container>
      </div>
    </div>
  );
};

export default Main;
