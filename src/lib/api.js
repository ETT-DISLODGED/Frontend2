import axios from 'axios';

// 서버 측에서 준 배포 url
const BASE_URL = 'https://dislodged.shop/';

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
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