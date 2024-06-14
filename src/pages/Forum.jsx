import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/forum.css";
import DiaryList from "../components/DiaryList";
import { groups } from "../util/group";
import axios from "axios";
import { getForumPosts } from "../lib/api";

import Pagination from "react-js-pagination";

import { jwtUtils } from "../util/jwtUtils";
import { useSelector } from "react-redux";

const Forum = () => {
  const token = useSelector((state) => state.Auth.token);

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

  useEffect(() => {
    const getPostList = async () => {
      try {
        const { postWithComments, totalCount } = await getForumPosts(
          activeGroup,
          page
        );
        setPostList(postWithComments);
        setPageCount(Math.ceil(totalCount / 6));
      } catch (error) {
        console.error("포럼 게시물을 가져오는 중 오류가 발생했습니다:", error);
      }
    };
    getPostList();
  }, [searchParams, activeGroup, page]);

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
      {jwtUtils.isAuth(token) && (
        <div className="write">
          <button className="write-button" onClick={() => navigate("/new")}>
            글 쓰러 가기
          </button>
        </div>
      )}

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
