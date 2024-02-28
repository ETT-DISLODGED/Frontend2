import { useParams, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
//import { DiaryStateContext } from "../App";

import "../styles/Detail.css";

import Comment from "./../components/comment";
//import comment2 from "../../public/assets/comment2.png";
//import { DiaryDispatchContext } from "./../App";
import axios from "axios";

import {
  deleteComment,
  deletePost,
  addComment,
  fetchPostDetail,
  fetchComments
} from "../lib/api";

const Detail = () => {
  const { id } = useParams();
  //console.log(id);

  //const { onRemove } = useContext(DiaryDispatchContext);

  //const diaryList = useContext(DiaryStateContext);

  /*const { commentsList, addComment, deleteComment } =
    useContext(CommentsContext);*/

  //const { addComment, deleteComment } = useContext(CommentsContext);

  const navigate = useNavigate();
  const [data, setData] = useState(); //targetDiary 담을 state. useState를 이용해야 상태변화가 일어난다

  //댓글 구현
  //const [commentsList, setCommentsList] = useState(comments_list); // 댓글 리스트
  const [comment1, setComment1] = useState(""); //댓글 입력창 상태
  const [commentCount, setCommentCount] = useState(0); //게시글 댓글 갯수

  const [commentList, setCommentList] = useState([]);
  // 필터링된 댓글 목록 상태
  const [filteredComments, setFilteredComments] = useState([]);

  const [userNickname, setUserNickname] = useState("띵띵띵"); // 상태에 사용자의 닉네임을 저장한다고 가정 (로그인과 연결 전 임시 코드, 기술블로그 참고)

  const maxLength = 300; //댓글 최대 300자

  const handleDeleteComment = async (id) => {
    alert("댓글을 삭제하시겠습니까?");
    //deleteComment(id); //app.jsx에서 정의
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
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      //onRemove(id);
      try {
        await deletePost(id);
        alert("삭제 완료");
        navigate("/Forum");
      } catch (error) {
        console.error("게시글 삭제 실패", error);
        alert("게시글 삭제 실패");
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault(); //form은 submit하면 창이 reload되는데 reload 되는 걸 막아줌
    //console.log(comment1);
    const newComment = {
      //id: Date.now(), //데이터베이스에 추가하면 아이디가 생성되므로 걔를 사용하면 됨
      content: comment1,
      post: id //useParmas에서 가져온 id 이용
      //created_at: new Date().toISOString(),
      //author: userNickname //로그인이랑 연결한 후 바꾸기
    };

    try {
      const createdComment = await addComment(newComment);
      setComment1(""); //댓글 입력창 리셋시켜주기

      setCommentList([...commentList, createdComment]);
      setCommentCount((commentCount) => commentCount + 1); //보이는 댓글 수 +1
    } catch (error) {
      console.log("댓글 추가 실패", error);
      alert("댓글 추가하는 동안 문제 발생");
    }
  };

  /*
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => it.id === id);
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]); */
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

  if (!data) {
    return <div className="DetailPage">데이터가 없습니다...</div>;
  } else {
    return (
      <div className="DetailPage">
        <div className="title">{data.title}</div>
        <div className="etc">
          <div className="detail_author">{data.author}</div>
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
          {/*user && user.name === data.author && (
            <div>
              <button
                className="edit"
                onClick={() => navigate(`/edit/${data.id}`)}
              >
                수정
              </button>
              <button className="remove" onClick={handleDelete}>
                삭제
              </button>
            </div>
          )*/}
          <button className="edit" onClick={() => navigate(`/edit/${data.id}`)}>
            수정
          </button>
          <button className="remove" onClick={handleDelete}>
            삭제
          </button>
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
              placeholder="1-300자까지 입력가능"
              onChange={handleInputChange}
            />
            <button type="submit">입력</button>
          </form>
          <p>
            {comment1.length}/{maxLength}
          </p>
        </div>
        {/*value로 comment1을 줌으로써 댓글 입력창란이 comment1의 상태대로 뜬다, 최대 300글자 입력*/}
      </div>
    );
  }
};

export default Detail;
