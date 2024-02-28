// Main.jsx

import React from "react";
import "../styles/Main.css";
import mainGif from "/assets/mainwave.gif";
import howtouseimage from "/assets/mainwave.gif";

const Section = ({ id, title, content, image }) => {
  return (
    <section id={id}>
      <div className="section-container">
        {id === "mainSection" ? (
          <div className="image-container">
            <img src={image} alt={`${title} 이미지`} />
          </div>
        ) : (
          <>
            <div className="image-container">
              <img src={image} alt={`${title} 이미지`} />
            </div>
            <div className="text-container">
              <h2>{title}</h2>
              <p>{content}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const Main = () => {
  return (
    <div>
      <div className="sections">
        <Section
          id="mainSection"
          title="메인"
          content=""
          image={mainGif} // 메인 섹션 이미지 추가
        />
        <Section
          id="howToUseSection"
          title="사용법 섹션"
          content="사용법이에요 사용법 사용법입니다"
          image={howtouseimage}
        />
        <Section
          id="aboutUsSection"
          title="소개 섹션"
          content="소개임 소개 소개입니다"
          image={howtouseimage}
        />
      </div>
    </div>
  );
};

export { Main, Section };
