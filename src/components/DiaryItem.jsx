import { useNavigate } from "react-router-dom";
import "../styles/forum.css";

const DiaryItem = ({ id, title, content, created_at, commentCount }) => {
  const navigate = useNavigate();

  const strDate = new Date(created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
    //hour: "2-digit",
    //minute: "2-digit",
    //second: "2-digit"
  }); //사용자한테 보여줄때 toLocaleDateString 사용

  // content가 50자보다 길 경우, 앞의 50자만 표시하고 "..." 추가
  const displayedContent =
    content.length > 42 ? content.slice(0, 42) + "..." : content;

  return (
    <div
      key={id}
      className="post-card"
      onClick={() => navigate(`/detail/${id}`)}
    >
      <div className="post-card-header">
        <span className="post-title">{title}</span>
        <span className="post-date">{strDate}</span>
      </div>
      <div className="post-card-body">
        <p>{displayedContent}</p>
      </div>
      <div className="comment-count">
        <img
          className="comment2"
          src="/assets/comment2.png"
          alt="Comment icon"
        />
        {commentCount}
      </div>
    </div>
  );
};

export default DiaryItem;
