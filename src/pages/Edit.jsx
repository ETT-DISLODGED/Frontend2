import { useParams, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  //console.log(id);

  const diaryList = useContext(DiaryStateContext);
  //console.log(diaryList);

  const [originData, setOriginData] = useState(); //targetDiary 저장할 state

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => it.id === id);
      //console.log(targetDiary);

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]); //id나 diaryList가 변할때마다 수행되도록
  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
      {/* originData가 있으면 DiaryEditor를 랜더하도록 만들어주기 */}
    </div>
  );
};

export default Edit;
