import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Main, Section } from './pages/Main';
import Myvoice from './pages/Myvoice';
import Forum from './pages/Forum';
import Mypage from './pages/Mypage';
import './styles/global.css';
import Navbar, { scrollToSection } from './components/Navbar';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* /Main에 대한 라우터 추가 */}
        <Route path='/Main/*' element={<Main />} />
        <Route
          path='/'
          element={
            <Main>
              <Routes>
                <Route path='/' element={<Section id="mainSection" />} />
                <Route path='/howToUse' element={<Section id="howToUseSection" />} />
                <Route path='/aboutUs' element={<Section id="aboutUsSection" />} />
              </Routes>
            </Main>
          }
        />
        <Route path='/Forum' element={<Forum />} />
        <Route path='/Myvoice' element={<Myvoice />} />
        <Route path='/Mypage' element={<Mypage />} />
      </Routes>
    </Router>
  );
};

export default App;
