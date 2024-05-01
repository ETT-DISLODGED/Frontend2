import { useState } from "react";
import { postMyTracklist, getMyTracklist } from "../lib/api";
import { useNavigate } from "react-router-dom";

const MypageItem = ({ id, tag, picture }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tracklist, setTracklist] = useState([]);
  const [buttonText, setButtonText] = useState("음원 불러오기"); // 버튼 텍스트 상태 추가
  const navigate = useNavigate();

  const initiatePlayList = async () => {
    setIsLoading(true);
    try {
      await postMyTracklist(id);
      setIsClicked(true);
    } catch (err) {
      setError(err.message);
      alert(err.response.data.RESULT);
      goToArticle();
      
    } finally {
      setIsLoading(false);
    }
  };

  const playTrackList = async () => {
    try {
      const data = await getMyTracklist(id);
      setTracklist(data.RESULT);
      if (data.RESULT.length > 0) {
        playAudio(0);
        setButtonText("음원 재생하기"); // 데이터가 성공적으로 로드된 후 버튼 텍스트 변경
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const playAudio = (trackIndex) => {
    const audio = new Audio(tracklist[trackIndex]);
    audio.play();
    audio.onended = () => {
      if (trackIndex < tracklist.length - 1) {
        playAudio(trackIndex + 1);
      }
    };
  };

  const goToArticle = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="albumCover">
      <div className="tag">TR #{tag}</div>
      <div className="circle">
        <div
          style={{ position: "relative" }}
          onClick={() => {
            if (!isClicked) initiatePlayList();
          }}
        >
          <img src={picture} alt="album cover" className="albumImage" />
          {isClicked && (
            <>
              <button
                className="playButton"
                style={{
                  height: '30px',
                  fontSize: '10.5px',
                  position: "absolute",
                  top: "48%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.8)", 
                  color: "white" 
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  playTrackList();
                }}
              >
                {buttonText} {/* 동적으로 변경되는 버튼 텍스트 */}
              </button>
              <button
                className="articleButton"
                style={{
                  height: '30px',
                  fontSize: '10.5px',
                  position: "absolute",
                  top: "70%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.8)", 
                  color: "white" 
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToArticle();
                }}
              >
                글 보러가기
              </button>
            </>
          )}
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

export default MypageItem;