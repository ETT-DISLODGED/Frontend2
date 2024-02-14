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

const dummyData = [
  {
    id: "544df27f-a5b1-474d-ba67-b6110b6645fb",
    author: "yumi",
    tag: "미미미",
    title: "테스트1",
    group: "진로",
    level: 3,
    content:
      "아무내용입니다. 아무내용. 회사에서 페이지네이션 기능을 구현할 일이 생겼다. 직접 기능을 만들면 좋겠지만, 생각보다 너무 어려웠다. 그래서 찾아보니 리액트 라이브러리 중 react-paginate를 이용해서 페이지네이션을 구현할 수 있다는 것을 찾았다.",
    created_at: "2024-02-03T13:44:24.918940+09:00",
    updated_at: "2024-02-03T13:44:24.918940+09:00",
    comment: [
      {
        id: "cebf24b7-6df4-4113-bf47-94b9e2499208",
        content: "Great post!",
        post: "544df27f-a5b1-474d-ba67-b6110b6645fb",
        created_at: "2024-02-03T14:36:07.521010+09:00",
        author: "ewhain"
      },
      {
        id: "eaa55425-5ca1-4f36-a20b-45e00adabdf7",
        content: "Thanks for sharing.",
        post: "544df27f-a5b1-474d-ba67-b6110b6645fb",
        created_at: "2024-02-03T14:36:07.521010+09:00",
        author: "ewhain"
      }
    ]
  },
  {
    id: "709f5720-8915-4b66-a8c6-591f2b0000e4",
    author: "yumi",
    tag: "미미미",
    title: "테스트2",
    group: "진로",
    level: 4,
    content: "아무내용입니다. 아무내용",
    created_at: "2024-02-03T13:44:24.918940+09:00",
    updated_at: "2024-02-03T13:44:24.918940+09:00",
    comment: [
      {
        id: "fc0f492c-0422-44ff-aee6-0a9a0a739545",
        content: "Very informative.",
        post: "709f5720-8915-4b66-a8c6-591f2b0000e4",
        created_at: "2024-02-03T14:36:07.521010+09:00",
        author: "ewhain"
      },
      {
        id: "084b9d26-a5d5-4a06-9204-bb92419bad14",
        content: "화이팅.",
        post: "709f5720-8915-4b66-a8c6-591f2b0000e4",
        created_at: "2024-02-03T14:36:07.521010+09:00",
        author: "ewhain"
      },
      {
        id: "e4424e23-cca7-415e-bd95-e3c21a1f507b",
        content: "굿굿.",
        post: "709f5720-8915-4b66-a8c6-591f2b0000e4",
        created_at: "2024-02-03T14:36:07.521010+09:00",
        author: "ewhain"
      },
      {
        id: "de45885c-9bf0-40df-acfe-3d12bb933b8f",
        content: "힘내세요.",
        post: "709f5720-8915-4b66-a8c6-591f2b0000e4",
        created_at: "2024-02-03T14:36:07.521010+09:00",
        author: "ewhain"
      }
    ]
  },
  {
    id: "ad935353-bb21-4978-86d3-63531737285d",
    author: "yumi2",
    tag: "미미미",
    title: "테스트3",
    group: "진로",
    level: 2,
    content: "아무내용입니다. 아무내용",
    created_at: "2024-02-03T13:44:24.918940+09:00",
    updated_at: "2024-02-03T13:44:24.918940+09:00",
    comment: [
      {
        id: "fa653479-ef09-4f1a-aa6c-4e75fe444a2f",
        content: "공감돼요.",
        post: "ad935353-bb21-4978-86d3-63531737285d",
        created_at: "2024-02-03T14:36:07.521010+09:00",
        author: "ewhain"
      }
    ]
  },
  {
    id: "bd8edc60-2783-4808-98fd-c9080c5a6203",
    author: "yumi2",
    tag: "미미미",
    title: "테스트4",
    group: "연애",
    level: 3,
    content: "아무내용입니다. 아무내용",
    created_at: "2024-02-03T13:44:24.918940+09:00",
    updated_at: "2024-02-03T13:44:24.918940+09:00",
    comment: []
  },
  {
    id: "abd57106-9a99-4beb-a3c6-7d708cc282bf",
    author: "yumi3",
    tag: "미미미",
    title: "테스트5",
    group: "가족/친구",
    level: 1,
    content: "아무내용입니다. 아무내용",
    created_at: "2024-02-03T13:44:24.918940+09:00",
    updated_at: "2024-02-03T13:44:24.918940+09:00",
    comment: []
  },
  {
    id: "208875ef-a850-4ebb-951d-48d2376e9532",
    author: "yumi3",
    tag: "미미미",
    title: "테스트6",
    group: "진로",
    level: 1,
    content: "아무내용입니다. 아무내용",
    created_at: "2024-02-03T13:44:24.918940+09:00",
    updated_at: "2024-02-03T13:44:24.918940+09:00",
    comment: []
  },
  {
    id: "89adc43a-548d-4305-86d0-faf4b6f09514",
    author: "yumi4",
    tag: "미미미",
    title: "테스트7",
    group: "진로",
    level: 1,
    content: "아무내용입니다. 아무내용",
    created_at: "2024-02-03T13:44:24.918940+09:00",
    updated_at: "2024-02-03T13:44:24.918940+09:00",
    comment: []
  },
  {
    id: "592024ad-2a7f-43b5-9483-69162f404b6f",
    author: "yumi4",
    tag: "미미미",
    title: "테스트8",
    group: "진로",
    level: 1,
    content: "아무내용입니다. 아무내용",
    created_at: "2024-02-03T13:44:24.918940+09:00",
    updated_at: "2024-02-03T13:44:24.918940+09:00",
    comment: []
  },
  {
    id: "a9b1cf95-d96b-409b-bade-0e027ab84af3",
    author: "yumi5",
    tag: "미미미",
    title: "테스트9",
    group: "진로",
    level: 1,
    content: "아무내용입니다. 아무내용",
    created_at: "2024-02-03T13:44:24.918940+09:00",
    updated_at: "2024-02-03T13:44:24.918940+09:00",
    comment: []
  },
  {
    id: "1fd32e3b-1ef7-4fbe-a6c3-856360e4708e",
    author: "yumi5",
    tag: "미미미",
    title: "테스트10",
    group: "진로",
    level: 1,
    content: "아무내용입니다. 아무내용",
    created_at: "2024-02-03T13:44:24.918940+09:00",
    updated_at: "2024-02-03T13:44:24.918940+09:00",
    comment: []
  }
];

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

export const CommentsContext = React.createContext();

const App = () => {
  const [commentsList, setCommentsList] = useState(comments_list);

  const [data, dispatch] = useReducer(reducer, dummyData);
  //console.log(new Date().getTime());

  //const dataId = useRef(6);

  //CREATE
  const onCreate = (/*created_at, */ tag, title, group, level, content) => {
    dispatch({
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
  };

  const addComment = (newComment) => {
    setCommentsList((prevComments) => [...prevComments, newComment]);
  };

  const deleteComment = (commentId) => {
    setCommentsList((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <CommentsContext.Provider
        value={{ commentsList, addComment, deleteComment }}
      >
        <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
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
        </DiaryDispatchContext.Provider>
      </CommentsContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
