import DiaryItem from "./DiaryItem";
import "../styles/forum.css";

const DiaryList = ({ diaryList }) => {
  // 작성된 날짜를 기준으로 내림차순 정렬
  const sortedDiaryList = diaryList.sort((a, b) => {
    // 날짜를 Date 객체로 변환하여 비교
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <div className="forum-body">
      {sortedDiaryList.length > 0 ? (
        sortedDiaryList.map((post) => (
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
