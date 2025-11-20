# 환경 변수 설정 가이드

## 📋 개요

프로젝트에서 사용하는 외부 API 키를 환경 변수로 관리합니다.

## 🔑 필요한 API 키

### 1. OpenWeatherMap API 키 (필수)
- **용도**: 날씨 정보 조회
- **발급 사이트**: https://openweathermap.org/api
- **무료 플랜**: 일일 1,000회 호출 가능

### 2. 공공데이터포털 API 키 (선택)
- **용도**: 공휴일 정보 조회
- **발급 사이트**: https://www.data.go.kr
- **선택사항**: 공휴일 기능을 사용하지 않으면 설정 불필요

## 🚀 설정 방법

### 1. `.env.example` 파일을 `.env`로 복사

프로젝트 루트에 이미 `.env.example` 파일이 있습니다. 이 파일을 복사하여 `.env` 파일을 만드세요.

**Windows:**
```bash
copy .env.example .env
```

**Mac/Linux:**
```bash
cp .env.example .env
```

### 2. `.env` 파일 열기 및 수정

생성된 `.env` 파일을 열고, `your_xxx_here` 부분을 실제 API 키로 교체하세요.

```env
# 예시 (실제 키로 교체)
VITE_OPENWEATHER_API_KEY=693e8221499578232f3f9ef78bc60cbc
VITE_PUBLIC_DATA_API_KEY=your_actual_key_here
```

### 3. 파일 위치 확인

`.env` 파일은 프로젝트 루트 디렉토리(`KDT_MULTICAMPUS/`)에 있어야 합니다.
```
KDT_MULTICAMPUS/
├── .env              ← 여기에 생성
├── .env.example      ← 템플릿 파일 (Git에 포함됨)
├── package.json
└── ...
```

## ⚠️ 중요 사항

1. **`.env` 파일은 절대 Git에 커밋하지 마세요!**
   - `.gitignore`에 이미 추가되어 있습니다.
   - API 키가 노출되면 보안 문제가 발생할 수 있습니다.

2. **Vite 환경 변수 규칙**
   - 환경 변수는 `VITE_` 접두사로 시작해야 합니다.
   - 코드에서 `import.meta.env.VITE_변수명`으로 접근합니다.

3. **서버 재시작 필요**
   - `.env` 파일을 수정한 후에는 개발 서버를 재시작해야 합니다.
   ```bash
   # 서버 중지 (Ctrl + C)
   # 서버 재시작
   npm start
   ```

## 📝 현재 하드코딩된 키

현재 코드에서 다음 키가 하드코딩되어 있습니다:
- OpenWeatherMap: `693e8221499578232f3f9ef78bc60cbc`

**이 키를 `.env` 파일로 이동하는 것을 권장합니다.**

## 🔒 보안 권장사항

1. **개발 환경과 프로덕션 환경 분리**
   - `.env.development` - 개발 환경용
   - `.env.production` - 프로덕션 환경용

2. **API 키 교체**
   - 공개 저장소에 키가 노출되었다면 즉시 교체하세요.

3. **키 권한 제한**
   - 가능하면 API 키에 IP 제한이나 도메인 제한을 설정하세요.

## 🆘 문제 해결

### API 키가 작동하지 않는 경우

1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. 환경 변수 이름이 `VITE_`로 시작하는지 확인
3. 개발 서버를 재시작했는지 확인
4. 브라우저 콘솔에서 오류 메시지 확인

### OpenWeatherMap API 오류

- API 키가 유효한지 확인
- 일일 호출 한도 초과 여부 확인
- 네트워크 연결 확인

