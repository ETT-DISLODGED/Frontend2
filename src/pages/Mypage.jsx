import React from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from "../redux/reducers/AuthReducer";
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(setToken(""));
    alert("로그아웃 완룡");
    navigate("/");
  };

  return (
    <div>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default Mypage;
