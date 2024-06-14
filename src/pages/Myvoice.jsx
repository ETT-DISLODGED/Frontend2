import React, { useState, useEffect } from "react";
import "../styles/MyVoice.css";
import { UpdateVoice, voiceInfo, playVoice, voiceStatistic } from "../lib/api";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog"; //모달용
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Myvoice = () => {
  const navigate = useNavigate();

  const [type, setType] = useState("ko-KR-Standard-A");
  const [speed, setSpeed] = useState(1); //말 빠르기
  const [pitch, setPitch] = useState(0); //피치
  const [ssmlGender, setSsmlGender] = useState("female");
  const text = "가상보이스 생성이 완료되었습니다.";

  const [recommendType, setRecommendType] = useState();
  const [recommendSpeed, setRecommendSpeed] = useState(); //말 빠르기
  const [recommendPitch, setRecommendPitch] = useState(); //피치

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/", { replace: true }); // 모달을 닫을 때 페이지 이동
  };
  const [modalMessage, setModalMessage] = useState("");

  // 빠르기 선택 처리 함수
  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  // 보이스 타입 선택 함수
  const handleVoiceType = (event) => {
    setType(event.target.value);

    if (type === ("ko-KR-Standard-A" || type === "ko-KR-Standard-B"))
      setSsmlGender("female");
    else setSsmlGender("male");
  };

  const handlePitchChange = (event) => {
    setPitch(event.target.value);
  };

  const registerVoice = async () => {
    const postVoice = {
      speed,
      pitch,
      type
    };
    try {
      await UpdateVoice(postVoice);
      setModalMessage("가상 보이스 생성 완료!");
      setOpen(true);
    } catch (error) {
      console.error("목소리 업데이트 실패", error);
      setModalMessage("목소리 업데이트 실패");
      setOpen(true);
    }
  };
  //보이스 추천 정보 받아오기
  const recommendResult = async () => {
    const { recommend_type, recommend_speed, recommend_pitch } =
      await voiceStatistic();
    if (recommend_type == "ko-KR-Standard-A") setRecommendType("여성a");
    else if (recommend_type == "ko-KR-Standard-B") setRecommendType("여성b");
    else if (recommend_type == "ko-KR-Standard-C") setRecommendType("남성a");
    else if (recommend_type == "ko-KR-Standard-D") setRecommendType("남성b");

    setRecommendSpeed(recommend_speed.toFixed(1));
    setRecommendPitch(recommend_pitch.toFixed(0));
  };

  const listenVoice = async () => {
    try {
      await playVoice(text, speed, pitch, type);
    } catch (error) {
      ("목소리 재생 실패");
    }
  };

  useEffect(() => {
    const getVoice = async () => {
      try {
        const { user_speed, user_pitch, user_type } = await voiceInfo();
        setSpeed(user_speed || 1.0);
        setPitch(user_pitch || 0.0);

        setType(user_type || "ko-KR-Standard-A");
      } catch (error) {
        console.error("보이스 정보를 가져오는 중 오류가 발생했습니다:", error);
      }
    };
    getVoice();
    recommendResult();
  }, []);

  return (
    <div className="myVoice">
      <div className="voice-intro">
        <h2>가상보이스 생성하기</h2>
      </div>
      <div className="voiceRecommend">
        <div className="recommendTitle">가상 보이스 추천</div>
        <div className="recommendContent">
          {recommendType ? (
            <>
              <div className="recommend">
                기본 보이스 추천 : {recommendType},
              </div>
              <div className="recommend">스피드 추천 : {recommendSpeed}, </div>
              <div className="recommend">피치 추천 : {recommendPitch} </div>
            </>
          ) : (
            <div className="noRecommend">
              보이스가 마음에 드는 댓글에 좋아요를 남겨주세요!
            </div>
          )}
        </div>
      </div>
      <div className="voice">
        <div className="voice_letter">기본보이스</div>
        <div className="voice_radio">
          <div className="voice_select">
            <input
              type="radio"
              id="ko-KR-Standard-A"
              name="voiceType"
              value="ko-KR-Standard-A"
              checked={type === "ko-KR-Standard-A"}
              onChange={handleVoiceType}
            />
            <label htmlFor="ko-KR-Standard-A">여성a</label>
          </div>
          <div className="voice_select">
            <input
              type="radio"
              id="ko-KR-Standard-B"
              name="voiceType"
              value="ko-KR-Standard-B"
              checked={type === "ko-KR-Standard-B"}
              onChange={handleVoiceType}
            />
            <label htmlFor="ko-KR-Standard-B">여성b</label>
          </div>
          <div className="voice_select">
            <input
              type="radio"
              name="voiceType"
              id="ko-KR-Standard-C"
              value="ko-KR-Standard-C"
              checked={type === "ko-KR-Standard-C"}
              onChange={handleVoiceType}
            />
            <label htmlFor="ko-KR-Standard-C">남성a</label>
          </div>
          <div className="voice_select">
            <input
              type="radio"
              name="voiceType"
              value="ko-KR-Standard-D"
              id="ko-KR-Standard-D"
              checked={type === "ko-KR-Standard-D"}
              onChange={handleVoiceType}
            />
            <label htmlFor="ko-KR-Standard-D">남성b</label>
          </div>
        </div>
      </div>
      <div className="speed">
        <div className="speed_letter">스피드</div>
        <div className="speed_two">
          <span className="speedWord">{speed}</span>
          <div className="speed_select">
            <span className="range-value range-min">0.7</span>
            <input
              type="range"
              id="speed_val"
              name="speed_val"
              min="0.7"
              max="1.3"
              step="0.1"
              value={speed}
              onChange={handleSpeedChange}
              className="speed-range"
            />
            <span className="range-value range-max">1.3</span>
          </div>
        </div>
      </div>
      <div className="pitch">
        <div className="pitch_letter">피치</div>
        <div className="pitch_two">
          <span className="pitchWord">{pitch}</span>
          <div className="pitch_select">
            <span className="range-value range-min">-5</span>
            <input
              type="range"
              id="speed_val"
              name="speed_val"
              min="-5"
              max="5"
              step="1"
              value={pitch}
              onChange={handlePitchChange}
              className="pitch-range"
            />
            <span className="range-value range-max">5</span>
          </div>
        </div>
      </div>
      <div className="play">
        <div className="playContent">
          <span className="playLetter">가상보이스 들으러가기</span>
          <img
            className="play_button"
            src="/assets/commentPlay.png"
            alt="play icon"
            onClick={listenVoice}
          />
        </div>
        <button className="save_voice" onClick={registerVoice}>
          저장하기
        </button>
        <Dialog open={open} onClose={handleClose}>
          <DialogActions>
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                position: "absolute",
                right: 5,
                top: 1,
                color: (theme) => theme.palette.grey[500],
                padding: "3px"
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <DialogContent>{modalMessage}</DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Myvoice;
