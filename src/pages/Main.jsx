import React from "react";
import { Link } from "react-router-dom"; // React Router의 Link 컴포넌트를 불러옵니다.
import "../styles/Main.css";
//import mainGif from "/assets/mainwave.gif";

const Main = () => {
  return (
    <div className="main-container">
      <section className="section section1">
      </section>
      <section className="section section2">
        <div className="section2-content">
          {/* <img src="/public/assets/neonwave.png" alt="Image" className="section2-image" /> */}
          <p>DISLODGED사용법 사용법 섹션입니다.
            예예 사용법섹션입니다. 사용법예예예
          </p>
          <Link to="/myvoice">
            <button>나만의 가상 보이스 생성하기</button> 
          </Link>
        </div>
      </section>
      <section className="section section3">
      <div className="section3-content">
          <p>이건 왜 만들었을까?
            우리가 누구인지 궁금합니까.
            어떤 기술들이 쓰였는지 알고싶나요
            예 저도 그렇습니다.</p>
            <p>의견이나 건의사항이 있다면 알려주세요</p>
            <button>Contact us</button> 
        </div>
      </section>
    </div>
  );
};

export default Main;
