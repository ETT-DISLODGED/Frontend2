import MyHeader from "../components/MyHeader";
import "../styles/DiaryEditor.css";
import { getStringDate } from "../util/date";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import { groups } from "../util/group";
import axios from "axios";
import { createDiary, updateDiary } from "../lib/api";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const [created_at, setCreated_at] = useState(
    new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  );
  const [updated_at, setUpdated_at] = useState(created_at);
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [level, setLevel] = useState(2);
  const [content, setContent] = useState(""); // 작성한 content의 상태 저장

  const tagRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef(); //작성 안되었을 때 contentArea에 focus

  // tag 입력 처리
  const handleTagChange = (e) => {
    const { value } = e.target;
    if (value.length <= 7) {
      // tag는 최대 7글자까지 허용
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

  // 입력 검증 및 포커스 처리를 위한 함수
  const validateInput = (ref, value, message) => {
    if (value.length < 1) {
      ref.current.focus();
      alert(message);
      return false;
    }
    return true;
  };

  const validateCategory = (value, message) => {
    if (value == "") {
      alert(message);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInput(tagRef, tagRef.current.value, "태그를 작성해주세요!"))
      return;
    if (
      !validateInput(titleRef, titleRef.current.value, "제목을 작성해주세요!")
    )
      return;
    if (
      !validateInput(
        contentRef,
        contentRef.current.value,
        "고민글을 작성해주세요!"
      )
    )
      return;

    if (!validateCategory(group, "게시판을 선택해주세요!")) return;

    const postData = {
      tag,
      title,
      group,
      level,
      content
    };

    try {
      if (!isEdit) {
        await createDiary(postData);
      } else {
        await updateDiary(originData.id, postData);
      }
      navigate("/", { replace: true });
    } catch (error) {
      console.error("게시글 작성/수정에 실패", error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      setCreated_at(
        new Date(originData.created_at).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric"
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
        <span className="editForm-date">날짜 </span>
        <div className="editor-date">{created_at}</div>
        <span className="editForm-tag">태그</span>
        <input
          className="tag-input"
          type="text"
          placeholder="마이페이지에 보여지는 해당 앨범 이름 (1-7글자까지 입력)"
          value={tag}
          ref={tagRef}
          onChange={handleTagChange}
        />
        <span className="editForm-title">제목</span>
        <input
          className="title-input"
          type="text"
          placeholder="1-20자까지 입력"
          value={title}
          ref={titleRef}
          onChange={handleTitleChange}
        />
        <span className="editForm-category">게시판</span>
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

        <span className="editForm-text">본문내용</span>
        <div className="input_box text_wrapper">
          <textarea
            placeholder="고민을 적어주세요!"
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
