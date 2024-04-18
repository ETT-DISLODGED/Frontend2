import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux"; // useDispatch를 추가합니다.
import "../styles/Mypage.css";
import MypageList from "../components/MypageList";

import { getMyForumPosts } from "../lib/api";
import Pagination from "react-js-pagination";
import { setToken } from "../redux/reducers/AuthReducer";

const Mypage = () => {
  const dispatch = useDispatch(); // useDispatch를 사용하여 dispatch 함수를 가져옵니다.
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [postList, setPostList] = useState([]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    updateURL(pageNumber);
  };

  const updateURL = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  const logout = async () => {
    // 로그아웃 액션을 dispatch 합니다.
    dispatch(setToken(""));
    alert("로그아웃 완료");

    navigate("/");
  };

  useEffect(() => {
    const getMyPostList = async () => {
      try {
        const { postWithComments, totalCount } = await getMyForumPosts(page);
        setPostList(postWithComments);
        setPageCount(Math.ceil(totalCount / 4));
      } catch (error) {
        console.error("내가 작성한 게시글을 가져오는 데 실패했습니다:", error);
      }
    };
    getMyPostList();
  }, [searchParams, page]);

  return (
    <div className="mypage">
      <div className="mypage-header">
        <h2>마이페이지</h2>
      </div>
      <div className="logout">
        <button className="logout-button" onClick={logout}>
          로그아웃
        </button>
      </div>
      <MypageList mypageList={postList} />
      <div className="mypage-footer">
        <Pagination
          activePage={Number(page)}
          itemsCountPerPage={4}
          totalItemsCount={pageCount * 4}
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
