import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/Mypage.css";
import MypageList from "../components/MypageList";

import { getMyForumPosts } from "../lib/api";
import { getUser } from "../lib/api";  // Ensure the correct import path for getUser
import Pagination from "react-js-pagination";
import { setToken } from "../redux/reducers/AuthReducer";

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [postList, setPostList] = useState([]);
  const [userName, setUserName] = useState('Loading...'); // State to store the username

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(); // Fetch user data
        setUserName(userData.data.nickname); // Assuming the username field is directly accessible
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserName('Failed to load user data');
      }
    };

    fetchUserData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    updateURL(pageNumber);
  };

  const updateURL = (pageNumber) => {
    setSearchParams({ page: pageNumber });
  };

  const logout = async () => {
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
        console.error("Failed to retrieve my forum posts:", error);
      }
    };
    getMyPostList();
  }, [searchParams, page]);

  return (
    <div className="mypage">
      <div className="mypage-header">
        <h2>{userName} 님의 TRACK LIST</h2>
        
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
