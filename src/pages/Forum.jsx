import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import "../styles/forum.css";
import DiaryList from "../components/DiaryList";
import { groups } from "../util/group";
import { CommentsContext } from "../App";

// 카테고리 목록을 상수로 선언
//const categories = ["진로", "연애", "가족/친구", "기타"];

const Forum = () => {
  const diaryList = useContext(DiaryStateContext);

  const { commentsList } = useContext(CommentsContext);

  const navigate = useNavigate();

  //전체 게시글을 상태로 관리
  const [data, setData] = useState([]);

  // 현재 선택된 카테고리를 상태로 관리
  const [activeGroup, setActiveGroup] = useState("진로");

  useEffect(() => {
    if (diaryList.length >= 1) {
      setData(diaryList);
    }
  }, [diaryList]);

  // 현재 선택된 카테고리에 따라 게시글 필터링
  const filteredDiary = data.filter((data) => data.group === activeGroup);

  // Forum 컴포넌트 내에서 각 게시글의 댓글 수를 계산하는 함수(postId 이용)
  const getCommentCount = (post) => {
    return commentsList.filter((comment) => comment.post === post).length;
  };
  // 게시글 데이터에 댓글 수를 추가하여 업데이트합니다
  const diaryListWithComments = filteredDiary.map((diary) => ({
    ...diary,
    commentCount: getCommentCount(diary.id)
  }));

  return (
    <div className="forum">
      <div className="forum-intro">
        <h2>게시판</h2>
      </div>
      <div className="forum-header">
        {groups.map((group) => (
          <div
            key={group.group_id}
            className={`forum-tab ${
              activeGroup === group.group_descript ? "active" : ""
            }`}
            onClick={() => setActiveGroup(group.group_descript)}
          >
            {group.group_descript}
          </div>
        ))}
      </div>
      <div className="write">
        <button className="write-button" onClick={() => navigate("/new")}>
          글 쓰러 가기
        </button>
      </div>

      <DiaryList diaryList={diaryListWithComments} />
      {/*<Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChange={handleChangePage}
          />*/}
    </div>
  );
};

export default Forum;
