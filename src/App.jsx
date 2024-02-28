import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import { Main, Section } from "./pages/Main";
import Myvoice from "./pages/Myvoice";
import Forum from "./pages/Forum";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles/global.css";
import Navbar, { scrollToSection } from "./components/Navbar";

import { useSelector } from "react-redux";

// UUID 생성 함수 시뮬레이션
const generateUUID = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const token = useSelector((state) => state.Auth.token);
  console.log(token);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* /Main에 대한 라우터 추가 */}
        <Route path="/Main/*" element={<Main />} />
        <Route
          path="/"
          element={
            <Main>
              <Routes>
                <Route path="/" element={<Section id="mainSection" />} />
                <Route
                  path="/howToUse"
                  element={<Section id="howToUseSection" />}
                />
                <Route
                  path="/aboutUs"
                  element={<Section id="aboutUsSection" />}
                />
              </Routes>
            </Main>
          }
        />
        <Route path="/Forum" element={<Forum />} />
        <Route path="/New" element={<New />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Edit/:id" element={<Edit />} />

        <Route path="/Myvoice" element={<Myvoice />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
