import React, { useEffect , useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Main from "./pages/Main";
import Myvoice from "./pages/Myvoice";
import Forum from "./pages/Forum";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles/global.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { jwtUtils } from "./util/jwtUtils"; 

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const token = useSelector((state) => state.Auth.token);
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (jwtUtils.isAuth(token)) { // 토큰이 유효한 경우에만 사용자 정보 가져오기
        const userId = jwtUtils.getUserId(token);
        const nickname = await jwtUtils.getNickname(token);
        setUserInfo({ userId, nickname });
      }
    };

    fetchUserInfo();
  }, [token]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar isLoggedIn={!!userInfo} />
      <Routes>
        <Route path="/Main/*" element={<Main />} />
        <Route
          path="/"
          element={
            <Main/>
          }
        />
        <Route path="/Forum" element={<PrivateRoute component={Forum} />} />
        <Route path="/New" element={<PrivateRoute component={New} />} />
        <Route
          path="/Detail/:id"
          element={<PrivateRoute component={Detail} />}
        />
        <Route path="/Edit/:id" element={<PrivateRoute component={Edit} />} />
        <Route path="/Myvoice" element={<PrivateRoute component={Myvoice} />} />
        <Route path="/Mypage" element={<Mypage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
