// API 기본 설정
// VITE_API_URL이 설정되어 있으면 /api를 추가, 없으면 기본값 사용
let baseUrl = import.meta.env.VITE_API_URL;
if (!baseUrl) {
  baseUrl = 'http://localhost:8081';
}
// URL 끝에 /api가 없으면 추가
if (!baseUrl.endsWith('/api')) {
  baseUrl = baseUrl.endsWith('/') ? `${baseUrl}api` : `${baseUrl}/api`;
}

const API_BASE_URL = baseUrl;

export default API_BASE_URL;
