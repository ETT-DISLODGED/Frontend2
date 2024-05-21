import { useParams, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
//import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";
import axios from "axios";

import { getTargetPost } from "../lib/api";

const Edit = () => {
  //const serverURL = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();

  const { id } = useParams();
  //console.log(id);

  //const diaryList = useContext(DiaryStateContext);

  const [originData, setOriginData] = useState(); //targetDiary 저장할 state

  useEffect(() => {
    const getTarget = async () => {
      try {
        const data = await getTargetPost(id);

        setOriginData(data);
      } catch (error) {
        console.log("저장된 게시글 내용 가져오는 중 오류 발생", error);
        //alert("존재하지 않는 게시글입니다");
        navigate(-1); //이전페이지로 이동
      }
    };

    getTarget();
  }, [id, navigate]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
      {/* originData가 있으면 DiaryEditor를 랜더하도록 만들어주기 */}
    </div>
  );
};

export default Edit;
