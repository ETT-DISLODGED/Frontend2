import { useNavigate } from "react-router-dom";

import { getMyTracklist, postMyTracklist } from "../lib/api";
import "../styles/Mypage.css";
import { useState } from "react";

const MypageItem = ({id, created_at, tag, picture }) => {
  const [isClicked, setIsClicked] = useState(false);

  const playTrackList = async () => {
    
  };
  


  // // 프론트에서 mp3가 담긴 URL이 잘 틀어지는지 테스트 -임시 민경
  // const [audio] = useState(new Audio('https://dislodged.s3.ap-northeast-2.amazonaws.com/a123.mp3'));
  // // const navigate = useNavigate();

  // const playAudio = () => {
  //   audio.play();
  // };

  const strDate = new Date(created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="albumCover">
      <div className="tag">TR #{tag}</div>
      <div className="circle">
        {/* 이미지와 버튼을 함께 래핑하는 컨테이너 */}
        <div
          style={{ position: "relative" }}
          onClick={() => setIsClicked(!isClicked)} // 이미지 클릭시 상태 변경
        >
          <img src={picture} alt="album cover" className="albumImage" />
          {/* 이미지 클릭시 버튼이 보이도록 조건부 렌더링 */}
          {isClicked && (
            <>
              <button
                className="playButton"
                onClick={() => {
                  playTrackList();
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1
                }}
              >
                재생
              </button>
            </>
          )}
        </div>
      </div>

    </div>
  );
};


export default MypageItem;
