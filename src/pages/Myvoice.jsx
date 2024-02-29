import React, { useState } from "react";
import "../styles/MyVoice.css";

const Myvoice = () => {
  const [speed, setSpeed] = useState(1);
  const [voiceType, setVoiceType] = useState("");
  const [pitch, setPitch] = useState("0");

  // 빠르기 선택 처리 함수
  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  // 보이스 타입 선택 함수
  const handleVoiceType = (event) => {
    setVoiceType(event.target.value);
  };

  const handlePitchChange = (event) => {
    setPitch(event.target.value);
  };

  return (
    <div className="myVoice">
      <div className="voice">
        <div className="voice_letter">기본보이스</div>
        <div className="voice_select">
          <input
            type="radio"
            name="voiceType"
            value="standard1"
            checked={voiceType === "standard1"}
            onChange={handleVoiceType}
          />
          여성a
        </div>
        <div className="voice_select">
          <input
            type="radio"
            name="voiceType"
            value="standard2"
            checked={voiceType === "standard2"}
            onChange={handleVoiceType}
          />
          여성b
        </div>
        <div className="voice_select">
          <input
            type="radio"
            name="voiceType"
            value="standard3"
            checked={voiceType === "standard3"}
            onChange={handleVoiceType}
          />
          남성a
        </div>
        <div className="voice_select">
          <input
            type="radio"
            name="voiceType"
            value="standard4"
            checked={voiceType === "standard4"}
            onChange={handleVoiceType}
          />
          남성b
        </div>
      </div>
      <div className="speed">
        <div className="speed_letter">스피드</div>
        <span>{speed}</span>
        <div className="speed_select">
          <input
            type="range"
            id="speed_val"
            name="speed_val"
            min="0.25"
            max="4"
            value={speed}
            onChange={handleSpeedChange}
            className="speed-range"
          />
        </div>
      </div>
      <div className="pitch">
        <div className="pitch_letter">피치</div>
        <span>{pitch}</span>
        <div className="pitch_select">
          <input
            type="range"
            id="speed_val"
            name="speed_val"
            min="-20"
            max="20"
            value={pitch}
            onChange={handlePitchChange}
            className="pitch-range"
          />
        </div>
      </div>
    </div>
  );
};

export default Myvoice;
