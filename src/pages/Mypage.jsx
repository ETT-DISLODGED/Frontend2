import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux"; // useDispatch를 추가합니다.
import "../styles/Mypage.css";
import DiaryList from "../components/DiaryList";
import { getForumPosts } from "../lib/api";
import Pagination from "react-js-pagination";
import { setToken } from "../redux/reducers/AuthReducer";


const Mypage = () => {
  const dispatch = useDispatch(); // useDispatch를 사용하여 dispatch 함수를 가져옵니다.
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [postList, setPostList] = useState([]);
  const [activeGroup, setActiveGroup] = useState(searchParams.get("group") || "진로");


  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    updateURL(activeGroup, pageNumber);
  };

  const updateURL = (groupName, pageNumber) => {
    setSearchParams({ group: groupName, page: pageNumber });
  };

  const logout = async () => {
    // 로그아웃 액션을 dispatch 합니다.
    dispatch(setToken(""));
    alert("로그아웃 완료");
    navigate("/");
  };

  useEffect(() => {
    const getPostList = async () => {
      try {
        const { postWithComments, totalCount } = await getForumPosts(activeGroup, page);
        setPostList(postWithComments);
        setPageCount(Math.ceil(totalCount / 6));
      } catch (error) {
        console.error("포럼 게시물을 가져오는 중 오류가 발생했습니다:", error);
      }
    };
    getPostList();
  }, [searchParams, activeGroup, page]);

  return (
    <div className="mypage">
      <div className="mypage-header">
        <h3>마이페이지</h3>
      </div>
      <div className="write">
        <button className="write-button" onClick={logout}>
          로그아웃
        </button>
      </div>
      <DiaryList diaryList={postList} />
      <div className="mypage-footer">
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

export default Mypage;
