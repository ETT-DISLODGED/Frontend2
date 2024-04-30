import React, { useState, useEffect } from "react";
import "../styles/comment.css";
import { jwtUtils } from "../util/jwtUtils";
import { useSelector } from "react-redux";
import {
  getTargetPost,
  forumPlayInfo,
  goodVoice,
  deleteGood
} from "../lib/api";

const Comment = ({ comments, deleteComment, post_id }) => {
  const token = useSelector((state) => state.Auth.token);
  //const [userNickname, setUserNickname] = useState("");
  const [userId, setUserId] = useState("");

  const handleCommentPlay = async (content, speed, pitch, type) => {
    //comment.authorid 가져오고 얘 이용해서 저장된 pitch, speed, type가져오기
    //comment.content 가져오고
    //이 두개 이용해서 음성 재생하게끔
    await forumPlayInfo(content, speed, pitch, type);
  };

  const [likeState, setLikeState] = useState({});

  useEffect(() => {
    // comments 배열로부터 초기 좋아요 상태 설정
    const initialLikeState = {};
    comments.forEach((comment) => {
      initialLikeState[comment.id] = comment.is_liked;
    });
    setLikeState(initialLikeState);
  }, [comments]);

  //댓글 좋아요 누를시 좋아요 state 바뀌고, postGood/deleteGood 실행시켜 서버에 전달해야함
  const toggleLike = async (commentId) => {
    const liked = !likeState[commentId];
    setLikeState((prevState) => ({
      ...prevState,
      [commentId]: liked
    }));
    if (liked) {
      goodVoice(commentId);
    } else deleteGood(commentId);
  };

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

  // 댓글을 createdAt 기준으로 오름차순 정렬
  const sortedComments = comments
    .slice()
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  return (
    <div className="comments">
      {sortedComments.map((comment) => {
        const createdAt = new Date(comment.created_at);
        const formattedDate = createdAt.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
          //second: "2-digit"
        });

        const heartImage = likeState[comment.id]
          ? "/assets/redHeart.png"
          : "/assets/whiteHeart.png";

        return (
          <div key={comment.id} className="comment">
            <div className="com_header">
              <p className="comment_author">{comment.author_nickname}</p>
              <p className="comment_date">{formattedDate}</p>
              <img
                src="/assets/commentPlay.png"
                onClick={() =>
                  handleCommentPlay(
                    comment.content,
                    comment.voice_speed,
                    comment.voice_pitch,
                    comment.voice_type
                  )
                }
                alt="commentPlay"
                className="commentPlay"
              ></img>

              <p className="voiceGood">이 목소리 좋아요</p>
              <img
                src={heartImage}
                onClick={() => toggleLike(comment.id)}
                className="heart"
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
