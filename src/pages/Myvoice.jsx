import React, { useState, useEffect } from "react";
import "../styles/MyVoice.css";

const Myvoice = () => {
  const [voiceType, setVoiceType] = useState("ko-KR-Standard-A");
  const [speakingRate, setSpeakingRate] = useState(1); //말 빠르기
  const [pitch, setPitch] = useState("0"); //피치
  const [ssmlGender, setSsmlGender] = useState("female");

  // 빠르기 선택 처리 함수
  const handleSpeedChange = (event) => {
    setSpeakingRate(event.target.value);
  };

  // 보이스 타입 선택 함수
  const handleVoiceType = (event) => {
    setVoiceType(event.target.value);

    if (voiceType === ("ko-KR-Standard-A" || voiceType === "ko-KR-Standard-B"))
      setSsmlGender("female");
    else setSsmlGender("male");
  };

  const handlePitchChange = (event) => {
    setPitch(event.target.value);
  };

  /*
  useEffect(() => {
    console.log(`voiceType is now: ${voiceType}`);
    console.log(`ssmlGender is now: ${ssmlGender}`);
    console.log(speakingRate);
    console.log(pitch);
  }, [voiceType, ssmlGender, speakingRate, pitch]);
*/

  return (
    <div className="myVoice">
      <div className="voice">
        <div className="voice_letter">기본보이스</div>
        <div className="voice_radio">
          <div className="voice_select">
            <input
              type="radio"
              id="ko-KR-Standard-A"
              name="voiceType"
              value="ko-KR-Standard-A"
              checked={voiceType === "ko-KR-Standard-A"}
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
              checked={voiceType === "ko-KR-Standard-B"}
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
              checked={voiceType === "ko-KR-Standard-C"}
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
              checked={voiceType === "ko-KR-Standard-D"}
              onChange={handleVoiceType}
            />
            <label htmlFor="ko-KR-Standard-D">남성b</label>
          </div>
        </div>
      </div>
      <div className="speed">
        <div className="speed_letter">스피드</div>
        <div className="speed_two">
          <span className="speedWord">{speakingRate}</span>
          <div className="speed_select">
            <span className="range-value range-min">0.7</span>
            <input
              type="range"
              id="speed_val"
              name="speed_val"
              min="0.7"
              max="1.3"
              step="0.1"
              value={speakingRate}
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
          <span className="playLetter">내 목소리 들으러가기</span>
          <img className="play_button" src="/assets/play.png" alt="play icon" />
        </div>
        <button className="save_voice">저장하기</button>
      </div>
    </div>
  );
};

export default Myvoice;
