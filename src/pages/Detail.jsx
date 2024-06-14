import { useParams, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

import "../styles/Detail.css";

import Comment from "./../components/comment";
import axios from "axios";

import { jwtUtils } from "../util/jwtUtils";
import { useSelector } from "react-redux";

import Dialog from "@mui/material/Dialog"; //모달용
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

import {
  deleteComment,
  deletePost,
  addComment,
  fetchPostDetail,
  fetchComments
} from "../lib/api";

const Detail = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // 모달을 닫을 때 페이지 이동
  };

  const [modalMessage, setModalMessage] = useState("");

  const { id } = useParams();

  const token = useSelector((state) => state.Auth.token);

  const navigate = useNavigate();
  const [data, setData] = useState(); //targetDiary 담을 state. useState를 이용해야 상태변화가 일어남

  //댓글 구현
  const [comment1, setComment1] = useState(""); //댓글 입력창 상태
  const [commentCount, setCommentCount] = useState(0); //게시글 댓글 갯수

  const [commentList, setCommentList] = useState([]);
  // 필터링된 댓글 목록 상태
  const [filteredComments, setFilteredComments] = useState([]);

  const [userNickname, setUserNickname] = useState("");

  const [userId, setUserId] = useState("");

  const [badWords, setBadWords] = useState([]);
  const [highlightComment, setHighlightComment] = useState("");

  const maxLength = 300; //댓글 최대 300자

  const handleDeleteComment = async (id) => {
    await deleteComment(id);

    setCommentList((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
    setCommentCount((commentCount) => commentCount - 1); //보이는 댓글 수-1
  };

  const handleInputChange = (e) => {
    setComment1(e.target.value.slice(0, maxLength));
  }; //입력한대로 댓글 창에 뜨게끔(300자까지만 보이게)

  //게시글 삭제
  const handleDelete = async () => {
    try {
      await deletePost(id);
      handleClose();
      navigate("/Forum");
    } catch (error) {
      console.error("게시글 삭제 실패", error);
      alert("게시글 삭제 실패");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault(); //form은 submit하면 창이 reload되는데 reload 되는 걸 막아줌

    let containBadWord = false;
    let modifiedText = comment1;
    badWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      if (regex.test(comment1)) {
        containBadWord = true;
        modifiedText = modifiedText.replace(
          regex,
          '<span class="highlight">$1</span>'
        );
      }
    });
    if (containBadWord) {
      setHighlightComment(modifiedText);
      alert("비속어가 포함된 댓글은 작성할 수 없습니다.");
      return; // 함수 실행 중단
    }

    const newComment = {
      content: comment1,
      post: id //useParmas에서 가져온 id 이용
    };

    try {
      const createdComment = await addComment(newComment);
      setComment1(""); //댓글 입력창 리셋시켜주기

      setCommentList([...commentList, createdComment]);
      setCommentCount((commentCount) => commentCount + 1); //보이는 댓글 수 +1
    } catch (error) {
      console.log("댓글 추가 실패", error);
    }
  };

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      jwtUtils.getNickname(token).then(setUserNickname);
      setUserId(jwtUtils.getId(token));
    }
  }, [token]);

  useEffect(() => {
    // 상세 정보를 가져오는 API 호출
    const fetchDiaryDetail = async () => {
      try {
        const response = await fetchPostDetail(id);
        setData(response); // 받아온 데이터를 상태에 저장

        const commentResponse = await fetchComments();
        setCommentList(commentResponse);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다.", error);
        alert("존재하지 않는 데이터입니다.");
        navigate("/", { replace: true }); // 게시글이 존재하지 않을 경우 홈으로 리다이렉트
      }
    };

    fetchDiaryDetail();
  }, [id, navigate]);

  useEffect(() => {
    const filteredComments = commentList.filter(
      (comment) => comment.post === id
    );
    setFilteredComments(filteredComments);
    setCommentCount(filteredComments.length);
  }, [id, commentList]);

  //욕설 리스트 불러와 badList에 저장
  useEffect(() => {
    fetch("/badWords.txt")
      .then((response) => response.text())
      .then((text) => {
        const words = text
          .split("\n")
          .map((word) => word.trim())
          .filter((word) => word);
        setBadWords(words);
      })
      .catch((error) =>
        console.error("bad word 불러오는 중 오류 발생:", error)
      );
  }, []);

  if (!data) {
    return <div className="DetailPage">데이터가 없습니다...</div>;
  } else {
    return (
      <div className="DetailPage">
        <div className="title">{data.title}</div>
        <div className="etc">
          <div className="detail_author">{data.author_nickname}</div>
          <div className="detail_date">
            작성시간 :{" "}
            {new Date(data.created_at).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
              //second: "2-digit"
            })}
          </div>
          <div className="detail_commentNum">
            <img
              className="comment2"
              src="/assets/comment2.png"
              alt="Comment icon"
            />{" "}
            {commentCount}
          </div>
        </div>
        <div className="content">{data.content}</div>
        <div className="detail_button">
          {/* 로그인한 사용자가 작성자일 경우에만 수정 및 삭제 버튼 표시 */}

          {jwtUtils.isAuth(token) && userId === data.author_id && (
            <div>
              <button
                className="edit"
                onClick={() => navigate(`/edit/${data.id}`)}
              >
                수정
              </button>
              <button className="remove" onClick={handleOpen}>
                삭제
              </button>
            </div>
          )}

          <button className="list" onClick={() => navigate("/forum")}>
            목록
          </button>
        </div>
        <Comment
          comments={filteredComments}
          deleteComment={handleDeleteComment}
          post_id={id} //해당 게시글의 댓글만 가져오도록
        />
        <div className="inputComment">
          <div className="userNickname">{userNickname}</div>
          <form onSubmit={handleAddComment}>
            <textarea
              className="writeComment"
              value={comment1}
              placeholder="작성한 댓글은 삭제할 수 없으니 신중하게 달아주세요!(1-300자까지 입력가능)"
              onChange={handleInputChange}
            />

            <button type="submit">입력</button>
          </form>
          <p>
            {comment1.length}/{maxLength}
          </p>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              정말로 삭제하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleDelete} autoFocus>
              삭제
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
};

export default Detail;
