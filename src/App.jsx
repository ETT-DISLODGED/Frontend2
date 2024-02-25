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
import "./styles/global.css";
import Navbar, { scrollToSection } from "./components/Navbar";
import { comments_list } from "../src/util/comment";

import { UserProvider } from "../src/components/userContext"; //로그인 구현 전 사용자 권한 위해 임시 테스트용

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

/*
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE":
      const newItem = {
        ...action.data,
        id: generateUUID() // id를 UUID로 생성하여 할당
      };
      newState = [newItem, ...state];
      break;
    case "REMOVE":
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    case "EDIT":
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    default:
      return state;
  }
  return newState;
};
*/

//export const DiaryStateContext = React.createContext();
//export const DiaryDispatchContext = React.createContext();

//export const CommentsContext = React.createContext();

const App = () => {
  //const [commentsList, setCommentsList] = useState(comments_list);

  //const [data, dispatch] = useReducer(reducer, dummyData);

  //CREATE

  // const onCreate = (/*created_at, */ tag, title, group, level, content) => {
  /*   dispatch({
      type: "CREATE",
      data: {
        id: generateUUID(),
        created_at: new Date().toISOString(), // ISO 8601 형식으로 날짜를 생성(서버에 저장할때),
        updated_at: new Date().toISOString(),
        tag,
        title,
        group,
        level,
        content
      }
    });
    //dataId.current += 1;
  };

  //Remove
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId
    });
  };

  //Edit
  const onEdit = (targetId, created_at, tag, title, group, level, content) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId, //id 유지
        created_at: created_at, //date 유지
        updated_at: new Date().toISOString(),
        tag,
        title,
        group,
        level,
        content
      }
    });
  };  */

  /*
  const addComment = (newComment) => {
    setCommentsList((prevComments) => [...prevComments, newComment]);
  };

  const deleteComment = (commentId) => {
    setCommentsList((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };
*/
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
      </Routes>
    </Router>
  );
};

export default App;
