import axios from "axios";
import store from "../redux/configStore";
import { jwtUtils } from "../util/jwtUtils";
import { useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";




// 서버 측에서 준 배포 url
const BASE_URL = "https://dislodged.shop";

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json" // 필요한 경우 헤더 추가
  }
});

/**
 1. 요청 인터셉터
 2개의 콜백 함수를 받습니다.
 */
client.interceptors.request.use(


  async (config) => {
    // HTTP Authorization 요청 헤더에 jwt-token을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
    //const dispatch = useDispatch();
    //const navigate = useNavigate();
    const token = store.getState().Auth.token;
    try {
      if (token) {
        if(jwtUtils.isAuth(token)) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        else{
          //dispatch(setToken(""));
          //alert("로그인타임만료");
          //navigate("/login")
          //const refreshToken = store.getState().Auth.refreshToken;
         // const newToken = await newAccessToken(refreshToken);
          //config.headers.Authorization = `Bearer ${newToken}`;
        }
     }


      return config;
    } catch (err) {
      console.error("[_axios.interceptors.request] config : " + err);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

/**
 2. 응답 인터셉터
 2개의 콜백 함수를 받습니다.
 */
client.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    */

    return response;
  },

  (error) => {
    /*
        http status가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.
    */
    return Promise.reject(error);
  }
);

export default client;

// 회원가입 POST
export const signUp = async (userData) => {
  try {
    // 회원가입 요청 보내기
    const response = await client.post("/accounts/signup/", userData);

    // 성공적으로 응답을 받았을 때
    return response.data;
  } catch (error) {
    // 요청이 실패했을 때
    console.error("회원가입 요청 실패:", error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    // 로그인 요청 보내기
    const response = await client.post("/accounts/login/", userData);
    return response.data;


  } catch (error) {
    // 요청이 실패했을 때
    console.error("로그인 요청 실패:", error);
    throw error;
  }
};



export const getForumPosts = async (activeGroup, page) => {
  try {
    const response = await client.get(
      `/posts/post/?group=${activeGroup}&page=${page}`
    );
    const postWithComments = response.data.results.map((post) => ({
      ...post,
      // API 응답에 댓글 수가 포함되어 있다면 직접 사용하고,
      // 그렇지 않은 경우 comment 배열의 길이 등으로 계산
      commentCount: post.comment?.length || 0
    }));
    return {
      postWithComments,
      totalCount: response.data.count // 전체 포스트 수
    };
  } catch (error) {
    console.error("포럼 게시물 목록을 가져오는 데 실패했습니다:", error);
    throw error;
  }
};

export const getTargetPost = async (id) => {
  try {
    const response = await client.get(`/posts/post/${id}`);
    return response.data;
  } catch (error) {
    console.log("게시글 상세정보 가져오는 중 오류발생", error);
    throw error;
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await client.delete(`/posts/comment/${id}`);
    return response.data;
  } catch (error) {
    console.error("댓글 삭제 실패", error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await client.delete(`/posts/post/${id}`);
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 실패", error);
    throw error;
  }
};

export const addComment = async (newComment) => {
  try {
    const response = await client.post("/posts/comment/", newComment);
    return response.data; // 성공적으로 댓글을 추가한 후의 데이터 반환
  } catch (error) {
    console.error("댓글 추가 실패:", error);
    throw error; // 에러를 다시 던져서 호출자가 처리할 수 있도록 함
  }
};

// 상세 페이지 정보를 가져오는 함수
export const fetchPostDetail = async (id) => {
  try {
    const response = await client.get(`/posts/post/${id}`);
    return response.data;
  } catch (error) {
    console.error("상세 정보를 불러오는데 실패했습니다.", error);
    throw error;
  }
};

//관련 댓글 데이터를 가져오는 함수
export const fetchComments = async () => {
  try {
    const response = await client.get(`/posts/comment/`);
    return response.data;
  } catch (error) {
    console.error("댓글 데이터를 불러오는데 실패했습니다.", error);
    throw error;
  }
};

//DiaryEditor.jsx
export const createDiary = async (postData) => {
  await client.post(`/posts/post/`, postData);
};

export const updateDiary = async (id, postData) => {
  await client.put(`/posts/post/${id}`, postData);
};

//jwtUtils
export const fetchUserInfo = async (token) => {
  try {
    const response = await client.get(`/accounts/update`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


//마이페이지 - 내가 작성한 게시글 불러오는 함수
export const getMyForumPosts = async (page) => {
  try {
    const response = await client.get(
      `/posts/post/?page=${page}`
    );
    const postWithComments = response.data.results.map((post) => ({
      ...post,
      // API 응답에 댓글 수가 포함되어 있다면 직접 사용하고,
      // 그렇지 않은 경우 comment 배열의 길이 등으로 계산
      commentCount: post.comment?.length || 0
    }));
    return {
      postWithComments,
      totalCount: response.data.count // 전체 포스트 수
    };
  } catch (error) {
    console.error("내가 작성한 게시물 목록을 가져오는 데 실패했습니다:", error);
    throw error;
  }
};


// refresh로 access 새로 받는 api 호출
export const newAccessToken = async (refreshToken) => {
  try {
    // 로그인 요청 보내기
    const response = await client.post("/accounts/refresh/token", { refreshToken });
    return response.data;
  } catch (error) {
    // 요청이 실패했을 때
    console.error("새로운 액세스 토큰 요청 실패:", error);
    throw error;
  }
};
