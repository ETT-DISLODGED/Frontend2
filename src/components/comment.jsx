import React, { useState, useEffect } from "react";
import "../styles/comment.css";

const Comment = ({ comments, deleteComment, post_id }) => {
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
            </div>
            <p className="comment_text">{comment.content}</p>
            <div className="comment_but">
              <button
                className="comment_del"
                onClick={() => deleteComment(comment.id)}
              >
                삭제하기
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
