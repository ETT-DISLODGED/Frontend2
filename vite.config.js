import React from "react";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    // 환경 변수를 안전하게 문자열로 변환
    "process.env.VITE_SERVER_URL": JSON.stringify(process.env.VITE_SERVER_URL)
  },
  server: {
    proxy: {
      "/posts": {
        target: "https://dislodged.shop", // 타겟 서버 URL
        changeOrigin: true // 호스트 헤더를 타겟 URL로 변경
      }
    }
  }
});
