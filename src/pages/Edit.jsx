import { useParams, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import DiaryEditor from "../components/DiaryEditor";
import axios from "axios";

import { getTargetPost } from "../lib/api";

const Edit = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [originData, setOriginData] = useState(); //targetDiary 저장할 state

  useEffect(() => {
    const getTarget = async () => {
      try {
        const data = await getTargetPost(id);

        setOriginData(data);
      } catch (error) {
        console.log("저장된 게시글 내용 가져오는 중 오류 발생", error);
        navigate(-1); //이전페이지로 이동
      }
    };

    getTarget();
  }, [id, navigate]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
