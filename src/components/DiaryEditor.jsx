import MyHeader from "../components/MyHeader";
import "../styles/DiaryEditor.css";
import { getStringDate } from "../util/date";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
//import { DiaryDispatchContext } from "./../App";
import { groups } from "../util/group";
import axios from "axios";

//const categories = ["진로", "연애", "가족/친구", "기타"]; // 카테고리 배열

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const [created_at, setCreated_at] = useState(
    new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
      //hour: "2-digit",
      //minute: "2-digit",
      //second: "2-digit"
    })
  );
  const [updated_at, setUpdated_at] = useState(created_at);
  //const [date, setDate] = useState(formattedDate);
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState(groups[0]);
  const [level, setLevel] = useState(3);
  const [content, setContent] = useState(""); // 작성한 content의 상태 저장

  const tagRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef(); //작성 안되었을 때 contentArea에 focus 주려고

  // tag 입력 처리
  const handleTagChange = (e) => {
    const { value } = e.target;
    if (value.length <= 8) {
      // tag는 최대 8글자까지 허용
      setTag(value);
    }
  };

  // title 입력 처리
  const handleTitleChange = (e) => {
    const { value } = e.target;
    if (value.length <= 20) {
      // title은 최대 20글자까지 허용
      setTitle(value);
    }
  };

  // 카테고리 선택 처리 함수
  const handleGroupClick = (group) => {
    setGroup(group);
  };

  // 심각도 선택 처리 함수
  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  //const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const handleSubmit = async () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    const postData = {
      tag,
      title,
      group,
      level,
      content
    };

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    )
      try {
        if (!isEdit) {
          //onCreate(tag, title, group, level, content);
          await axios.post(`/posts/post/`, postData, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4ODc3MTQwLCJpYXQiOjE3MDg4NTkxNDAsImp0aSI6Ijk4YmZjZWE3ZDkwYjQzMjU4NTc0ZDk4MzhiMTMyODFmIiwidXNlcl9pZCI6IjNjMTNmYjY3LWZlMTItNDVkZS1iYTUzLTllOTQxNDA5MGRjZSJ9.eFt3jiyz6Uk0fuiUUPVdzge7zIrD4wV4olhXUFAuVts
              `
            }
          });
          alert("작성 완료");
        } else {
          await axios.put(`/posts/post/${originData.id}`, postData, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4ODc3MTQwLCJpYXQiOjE3MDg4NTkxNDAsImp0aSI6Ijk4YmZjZWE3ZDkwYjQzMjU4NTc0ZDk4MzhiMTMyODFmIiwidXNlcl9pZCI6IjNjMTNmYjY3LWZlMTItNDVkZS1iYTUzLTllOTQxNDA5MGRjZSJ9.eFt3jiyz6Uk0fuiUUPVdzge7zIrD4wV4olhXUFAuVts
              `
            }
          });
          alert("수정 완료");
        }
        navigate("/", { replace: true });
      } catch (error) {
        console.error("게시글 작성/수정에 실패", error);
        alert("게시글 작성/수정에 실패");
      }
  };

  useEffect(() => {
    if (isEdit) {
      setCreated_at(
        new Date(originData.created_at).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric"
          //hour: "2-digit",
          //minute: "2-digit",
          //second: "2-digit"
        })
      );
      setUpdated_at(originData.updated_at);
      setTag(originData.tag);
      setTitle(originData.title);
      setGroup(originData.group);
      setLevel(originData.level);
      setContent(originData.content);
    }
  }, [isEdit, originData]);
  return (
    <div className="DiaryEditor">
      <MyHeader
        className="edHeader"
        headText={isEdit ? "수정하기" : "글 쓰기"} //edit인지 아닌지에 따라 header 달라짐
      />
      <div className="editorForm">
        <h4>날짜 </h4>
        <div className="editor-date">{created_at}</div>
        <h4>태그</h4>
        <input
          className="tag-input"
          type="text"
          placeholder="댓글 모아들을 때 사용할 태그(1-8글자까지 입력)"
          value={tag}
          ref={tagRef}
          onChange={handleTagChange}
        />
        <h4>제목</h4>
        <input
          className="title-input"
          type="text"
          placeholder="1-20자까지 입력"
          value={title}
          ref={titleRef}
          onChange={handleTitleChange}
        />
        <h4>게시판</h4>
        <div className="categorySelector">
          {groups.map((grou) => (
            <button
              key={grou.group_id}
              type="button"
              onClick={() => handleGroupClick(grou.group_descript)}
              className={
                group === grou.group_descript
                  ? "categoryButton on"
                  : "categoryButton off"
              }
            >
              {grou.group_descript}
            </button>
          ))}
        </div>
        <div className="severity-container">
          <h4>심각도(1~5)</h4>
          <p className="severity-description">
            자신의 고민에 대한 심각도를 표시해주세요 *본인만 확인 가능
          </p>{" "}
        </div>
        <span>{level}</span>
        <div className="severitySelector">
          <input
            type="range"
            id="level"
            name="level"
            min="1"
            max="5"
            value={level}
            onChange={handleLevelChange}
            className="severity-range"
          />
        </div>
        <h4>본문내용</h4>
        <div className="input_box text_wrapper">
          <textarea
            placeholder="고민을 적어주세요?"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <section>
        <div className="control_box">
          <button onClick={() => navigate(-1)}>취소하기</button>
          <button onClick={handleSubmit}>작성완료</button>
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
