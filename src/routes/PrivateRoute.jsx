import React from "react";
import { Navigate } from "react-router-dom";
import { jwtUtils } from "../util/jwtUtils";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const token = useSelector((state) => state.Auth.token);
  const { component: RouteComponent, path } = props;
  if (!jwtUtils.isAuth(token)) {
    alert("로그인이 필요한 페이지입니다");
    return <Navigate to={`/login?redirectUrl=${path}`} />;
  }
  return <RouteComponent />;
};

export default PrivateRoute;
