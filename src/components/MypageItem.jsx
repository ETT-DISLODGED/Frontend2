import { useState } from "react";
import { postMyTracklist, getMyTracklist } from "../lib/api";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog"; //모달용
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";

const MypageItem = ({ id, tag, picture, comments }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tracklist, setTracklist] = useState([]);
  const [buttonText, setButtonText] = useState("음원 불러오기");
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    if (!comments || comments.length === 0) {
      goToArticle(); // 모달을 닫을 때 페이지 이동
    }
  };
  const [modalMessage, setModalMessage] = useState("");

  const initiatePlayList = async () => {
    setIsLoading(true);
    try {
      await postMyTracklist(id);
      setIsClicked(true);
    } catch (err) {
      setError(err.message);
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
        setButtonText("음원 재생하기");
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

  const handleClickImage = () => {
    if (comments && comments.length > 0) {
      // 댓글이 있는 경우
      setIsClicked(!isClicked);
      if (!isClicked) initiatePlayList();
    } else {
      setOpen(true);
      //alert("해당 게시글에 달린 댓글이 없습니다! 게시글로 이동합니다.");
      setModalMessage(
        "해당 게시글에 달린 댓글이 없습니다! 게시글로 이동합니다."
      );
    }
  };

  return (
    <div className="albumCover">
      <div className="tag">TR #{tag}</div>
      <div className="circle">
        <div style={{ position: "relative" }} onClick={handleClickImage}>
          <img src={picture} alt="album cover" className="albumImage" />
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
          ;
          {isClicked && (
            <>
              <button
                className="playButton"
                style={{
                  height: "30px",
                  fontSize: "10.5px",
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
                {buttonText}
              </button>
              <button
                className="articleButton"
                style={{
                  height: "30px",
                  fontSize: "10.5px",
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
