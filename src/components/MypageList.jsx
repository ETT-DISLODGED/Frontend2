import MypageItem from "./MypageItem";
import "../styles/Mypage.css";

const MypageList = ({ mypageList }) => {
  return (
    <div className="mypage-body">
      {mypageList.length > 0 ? (
        mypageList.map((post) => (
          <MypageItem
            key={post.id}
            id={post.id}
            created_at={post.created_at}
            tag={post.tag}
            picture={post.image_url}
            
          />
        ))
      ) : (
        <p className="no-posts"> 작성한 게시글이 없습니다.</p>
      )}
    </div>
  );
};

MypageList.defaultProps = {
  mypageList: []
};
export default MypageList;
