import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/Mypage.css";
import MypageList from "../components/MypageList";
import bgm1 from "/assets/perfect.mp3";
import bgm2 from "/assets/whispersof.mp3";
import bgm3 from "/assets/onceinparis.mp3";
import bgm4 from "/assets/sadpiano.mp3";
import bgm5 from "/assets/loveserena.mp3";
import playIcon from "/assets/play2.png";
import pauseIcon from "/assets/pause.png";
import stopIcon from "/assets/stop.png";
import soundIcon from "/assets/sound.png";

import { getMyForumPosts } from "../lib/api";
import { getUser } from "../lib/api";
import Pagination from "react-js-pagination";
import { setToken } from "../redux/reducers/AuthReducer";

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [postList, setPostList] = useState([]);
  const [userName, setUserName] = useState("Loading...");
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [bgm, setBgm] = useState(bgm1);
  const bgms = [bgm1, bgm2, bgm3, bgm4, bgm5];

  useEffect(() => {}, []);

  const handleBgmChange = (event) => {
    const newBgm = event.target.value;
    setBgm(newBgm); // 새로운 BGM으로 상태 업데이트
    const audio = document.getElementById("bgm");
    audio.pause();
    audio.load(); // 새로운 소스를 로드
    if (isPlaying) {
      audio.play(); // 새 트랙 재생
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUserName(userData.data.nickname);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserName("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const getMyPostList = async () => {
      try {
        const { postWithComments, totalCount } = await getMyForumPosts(page);
        setPostList(postWithComments);
        setPageCount(Math.ceil(totalCount / 4));
      } catch (error) {
        console.error("Failed to retrieve my forum posts:", error);
      }
    };
    getMyPostList();
  }, [searchParams, page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    updateURL(pageNumber);
  };

  const updateURL = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  const logout = async () => {
    dispatch(setToken(""));
    navigate("/");
  };
  const togglePlay = () => {
    const audio = document.getElementById("bgm");
    if (isPlaying) {
      audio.pause(); // Pause
    } else {
      audio.play(); // Play
    }
    setIsPlaying(!isPlaying);
  };

  const stopMusic = () => {
    const audio = document.getElementById("bgm");
    audio.pause(); // Stop
    audio.currentTime = 0; // Reset
    setIsPlaying(false);
  };

  const adjustVolume = (e) => {
    const audio = document.getElementById("bgm");
    setVolume(parseFloat(e.target.value)); // 볼륨 조절
    audio.volume = parseFloat(e.target.value);
  };

  return (
    <div className="mypage">
      <div className="mypage-header">
        <h2>{userName} 님의 TRACK LIST</h2>
      </div>
      <div className="logout">
        <button className="logout-button" onClick={logout}>
          로그아웃
        </button>
      </div>
      <div className="bgm">
        <div
          className="music-controls"
          style={{
            background: "#242222",
            borderRadius: "10px",
            padding: "10px",
            marginTop: "10px",
            width: "300px"
          }}
        >
          <select
            onChange={handleBgmChange}
            value={bgm}
            style={{ marginRight: "10px" }}
          >
            {bgms.map((song, index) => (
              <option key={index} value={song}>
                BGM {index + 1}
              </option>
            ))}
          </select>
          <img
            onClick={togglePlay}
            src={isPlaying ? pauseIcon : playIcon}
            alt={isPlaying ? "일시정지" : "재생"}
            style={{
              cursor: "pointer",
              marginLeft: "15px",
              marginRight: "15px",
              height: "13px"
            }}
          />
          <img
            onClick={stopMusic}
            src={stopIcon}
            alt="정지"
            style={{ height: "13px", cursor: "pointer", marginRight: "25px" }}
          />
          <img
            src={soundIcon}
            alt="음량"
            style={{ height: "13px", marginRight: "10px" }}
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={adjustVolume}
            style={{ height: "10px", width: "100px", marginTop: "4px" }}
          />
        </div>
      </div>
      <MypageList mypageList={postList} />
      <div className="mypage-footer">
        <Pagination
          activePage={Number(page)}
          itemsCountPerPage={4}
          totalItemsCount={pageCount * 4}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>

      <audio id="bgm" autoPlay loop volume={volume}>
        <source src={bgm} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Mypage;
