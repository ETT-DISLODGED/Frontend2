//import jwtDecode from "jwt-decode";
// ES6 모듈 시스템의 명명된(named) export 사용
import { jwtDecode } from "/node_modules/.vite/deps/jwt-decode.js?v=821a7e9e";

export class jwtUtils {
  // 토큰 유효성 검사
  static isAuth(token) {
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token);
    if (decoded.exp > new Date().getTime() / 1000) {
      return true;
    } else {
      return false; //만료되면 refresh토큰 통해서 access토큰 가져오도록 구현해야함
    }
  }
  // 토큰에서 유저 id 가져오기
  static getId(token) {
    const decoded = jwtDecode(token);
    return decoded.jti;
  }
}
