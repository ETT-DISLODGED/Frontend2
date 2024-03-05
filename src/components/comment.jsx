import React, { useState, useEffect } from "react";
import "../styles/comment.css";
import { jwtUtils } from "../util/jwtUtils";
import { useSelector } from "react-redux";
import { getTargetPost } from "../lib/api";

const Comment = ({ comments, deleteComment, post_id }) => {
  const token = useSelector((state) => state.Auth.token);
  //const [userNickname, setUserNickname] = useState("");
  const [userId, setUserId] = useState("");

  const [post, setPost] = useState("");
  const targetPost = async () => {
    try {
      const response = await getTargetPost(post_id);
      setPost(response);
    } catch (error) {
      console.log("해당 게시글 가져오는데 실패했습니다");
    }
  };

  useEffect(() => {
    if (jwtUtils.isAuth(token)) {
      setUserId(jwtUtils.getId(token));
    }
    targetPost();
  }, [token, post_id]);

  return (
    <div className="comments">
      {comments.map((comment) => {
        const createdAt = new Date(comment.created_at);
        const formattedDate = createdAt.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
          //second: "2-digit"
        });
        return (
          <div key={comment.id} className="comment">
            <div className="com_header">
              <p className="comment_author">{comment.author}</p>
              <p className="comment_date">{formattedDate}</p>
              <img
                src="/assets/commentPlay.png"
                onClick={""}
                alt="commentPlay"
                className="commentPlay"
              ></img>
            </div>
            <p className="comment_text">{comment.content}</p>
            {jwtUtils.isAuth(token) && userId === post.author_id && (
              <div className="comment_but">
                <button
                  className="comment_del"
                  onClick={() => deleteComment(comment.id)}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
