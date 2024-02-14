import { useParams, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import "../styles/Detail.css";
import { comments_list } from "../util/comment";
import Comment from "./../components/comment";
//import comment2 from "../../public/assets/comment2.png";
import { DiaryDispatchContext } from "./../App";

import { CommentsContext } from "../App";

const Detail = () => {
  const { id } = useParams();
  //console.log(id);

  const { onRemove } = useContext(DiaryDispatchContext);

  const diaryList = useContext(DiaryStateContext);

  const { commentsList, addComment, deleteComment } =
    useContext(CommentsContext);
  const navigate = useNavigate();
  const [data, setData] = useState(); //targetDiary 담을 state. useState를 이용해야 상태변화가 일어난다

  //댓글 구현
  //const [commentsList, setCommentsList] = useState(comments_list); // 댓글 리스트
  const [comment1, setComment1] = useState(""); //댓글 입력창 상태
  const [commentCount, setCommentCount] = useState(0); //게시글 댓글 갯수
  // 필터링된 댓글 목록 상태
  const [filteredComments, setFilteredComments] = useState([]);

  const [userNickname, setUserNickname] = useState("띵띵띵"); // 상태에 사용자의 닉네임을 저장한다고 가정 (로그인과 연결 전 임시 코드, 기술블로그 참고)

  const maxLength = 300; //댓글 최대 300자

  /*const handleDeleteComment = (id) => {
    alert("댓글을 삭제하시겠습니까?");
    setCommentsList(
      commentsList.filter((comment) => {
        return comment.id !== id;
      })
    );
    setCommentCount((commentCount) => commentCount - 1); //보이는 댓글 수-1
  };*/

  const handleDeleteComment = (id) => {
    alert("댓글을 삭제하시겠습니까?");
    deleteComment(id); //app.jsx에서 정의
    setCommentCount((commentCount) => commentCount - 1); //보이는 댓글 수-1
  };

  const handleInputChange = (e) => {
    setComment1(e.target.value.slice(0, maxLength));
  }; //입력한대로 댓글 창에 뜨게끔(300자까지만 보이게)

  //게시글 삭제
  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onRemove(id);
      navigate("/Forum");
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault(); //form은 submit하면 창이 reload되는데 reload 되는 걸 막아줌
    //console.log(comment1);
    const newComment = {
      id: Date.now(), //데이터베이스에 추가하면 아이디가 생성되므로 걔를 사용하면 됨
      content: comment1,
      post: id, //useParmas에서 가져온 id 이용
      created_at: new Date().toISOString(),
      author: userNickname //로그인이랑 연결한 후 바꾸기
    };

    setComment1(""); //댓글 입력창 리셋시켜주기
    addComment(newComment);
    setCommentCount((commentCount) => commentCount + 1); //보이는 댓글 수 +1
  };

  useEffect(() => {
    const filteredComments = commentsList.filter(
      (comment) => comment.post === id
    );
    setFilteredComments(filteredComments);
    setCommentCount(filteredComments.length);
  }, [id, commentsList]);

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
  }, [id, diaryList]);

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
