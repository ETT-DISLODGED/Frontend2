import axios from 'axios';

// 서버 측에서 준 배포 url
const BASE_URL = 'https://dislodged.shop/';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json' // 필요한 경우 헤더 추가
  }
});

// 회원가입 POST
export const signUp = async (userData) => {
    try {
      // 회원가입 요청 보내기
      const response = await client.post('/accounts/signup/', userData);
      
      // 성공적으로 응답을 받았을 때
      return response.data;
    } catch (error) {
      // 요청이 실패했을 때
      console.error('회원가입 요청 실패:', error);
      throw error;
    }
  };
  export const login = async (userData) => {
    try {
      // 로그인 요청 보내기
      const response = await client.post('/accounts/login/', userData);
      
      //Authorization 헤더 설정
      const accessToken = response.data.token.access;
      console.log('accessToken:', accessToken);
      client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; 
      
      return response.data;
      
    } catch (error) {
      // 요청이 실패했을 때
      console.error('로그인 요청 실패:', error);
      throw error;
    }
  };
  
  export const getForumPosts = async (activeGroup, page) => {
    try {
      const response = await client.get(`/posts/post/?group=${activeGroup}&page=${page}`);
      const postsWithComments = response.data.results.map((post) => ({
        ...post,
        // API 응답에 댓글 수가 포함되어 있다면 직접 사용하고,
        // 그렇지 않은 경우 comment 배열의 길이 등으로 계산
        commentCount: post.comment?.length || 0
      }));
      return postsWithComments;
    } catch (error) {
      console.error('포럼 게시물 목록을 가져오는 데 실패했습니다:', error);
      throw error;
    }
  };