import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
//import { DiaryStateContext } from "../App";
import "../styles/forum.css";
import DiaryList from "../components/DiaryList";
import { groups } from "../util/group";
//import { CommentsContext } from "../App";
import axios from "axios";

import Pagination from "react-js-pagination";

// 카테고리 목록을 상수로 선언
//const categories = ["진로", "연애", "가족/친구", "기타"];

const Forum = () => {
  //const diaryList = useContext(DiaryStateContext);

  //const serverURL = import.meta.env.VITE_SERVER_URL;

  const [searchParams, setSearchParams] = useSearchParams(); //페이지네이션 위해

  const [pageCount, setPageCount] = useState(0); //페이지 갯수
  const [page, setPage] = useState(searchParams.get("page") || 1); //현재 페이지

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    updateURL(activeGroup, pageNumber);
  };

  //전체 게시글을 상태로 관리 (api 연결 후엔 해당 카테고리의 게시글만 관리하는 용도로 사용)
  const [postList, setPostList] = useState([]);

  const navigate = useNavigate();
  //const { commentsList } = useContext(CommentsContext);

  // 현재 선택된 카테고리를 상태로 관리
  const [activeGroup, setActiveGroup] = useState(
    searchParams.get("group") || "진로"
  );

  const handleGroupChange = (groupName) => {
    setActiveGroup(groupName);
    setPage(1); // 그룹을 변경하면 페이지를 1로 리셋
    updateURL(groupName, 1);
  };

  //URL 업데이트 함수
  const updateURL = (groupName, pageNumber) => {
    setSearchParams({ group: groupName, page: pageNumber });
  };

  /* useEffect(() => {
    if (diaryList.length >= 1) {
      setData(diaryList);
    }
    setPageCount(Math.ceil(filteredDiary.length / 6));
  }, [diaryList]); */

  useEffect(() => {
    const getPostList = async () => {
      try {
        const response = await axios.get(
          `/posts/post/?group=${activeGroup}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4ODc3MTQwLCJpYXQiOjE3MDg4NTkxNDAsImp0aSI6Ijk4YmZjZWE3ZDkwYjQzMjU4NTc0ZDk4MzhiMTMyODFmIiwidXNlcl9pZCI6IjNjMTNmYjY3LWZlMTItNDVkZS1iYTUzLTllOTQxNDA5MGRjZSJ9.eFt3jiyz6Uk0fuiUUPVdzge7zIrD4wV4olhXUFAuVts
              `
            }
          }
        );
        const postsWithComments = response.data.results.map((post) => ({
          ...post,
          // API 응답에 댓글 수가 포함되어 있다면 직접 사용하고,
          // 그렇지 않은 경우 comment 배열의 길이 등으로 계산
          commentCount: post.comment?.length || 0
        }));
        setPostList(postsWithComments);
        setPageCount(Math.ceil(response.data.count / 6));
        //console.log(postsWithComments);
      } catch (error) {
        console.log(error);
      }
    };
    getPostList();
  }, [searchParams, activeGroup, page]);

  // 현재 선택된 카테고리에 따라 게시글 필터링
  //const filteredDiary = postList.filter((data) => data.group === activeGroup);

  /*
  // Forum 컴포넌트 내에서 각 게시글의 댓글 수를 계산하는 함수(postId(post) 이용)
  const getCommentCount = (post) => {
    return commentsList.filter((comment) => comment.post === post).length;
  };
  // 게시글 데이터에 댓글 수를 추가하여 업데이트합니다
  const diaryListWithComments = postList.map((diary) => ({
    ...diary,
    commentCount: getCommentCount(diary.id)
  }));
*/
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
            onClick={() => handleGroupChange(group.group_descript)}
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

      <DiaryList diaryList={postList} />

      <div className="forum-footer">
        <Pagination
          activePage={Number(page)}
          itemsCountPerPage={6}
          totalItemsCount={pageCount * 6}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Forum;
