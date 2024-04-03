import { useNavigate } from "react-router-dom";
import "../styles/Mypage.css";

const MypageItem = ({id, created_at, tag, picture }) => {
  const navigate = useNavigate();

  const strDate = new Date(created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div
      key={id}
      className="albumCover"
      onClick={() => navigate(`/detail/${id}`)}
    >
    
     <div className="circle">
        <img src={picture} alt="album cover" className="albumImage" />
      </div>
      <div className="tag">#{tag}</div>
    </div>
  );
};

export default MypageItem;
