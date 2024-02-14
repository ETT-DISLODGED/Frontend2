import DiaryItem from "./DiaryItem";
import "../styles/forum.css";

const DiaryList = ({ diaryList }) => {
  return (
    <div className="forum-body">
      {diaryList.length > 0 ? (
        diaryList.map((post) => (
          <DiaryItem
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            created_at={post.created_at}
            commentCount={post.commentCount}
          />
        ))
      ) : (
        <p className="no-posts">해당 카테고리에 게시글이 없습니다.</p>
      )}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: []
};
export default DiaryList;
