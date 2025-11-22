# 환경 변수 설정 가이드

## 📋 개요

프로젝트 루트에 하나의 `.env` 파일로 백엔드와 프론트엔드의 환경 변수를 통합 관리합니다.

## 📁 .env 파일 생성

프로젝트 최상위 디렉토리(`KDT_MULTICAMPUS/`)에 `.env` 파일을 생성하고 다음 내용을 입력하세요:

```bash
# ============================================
# 백엔드 (Spring Boot) 설정
# ============================================
DB_HOST=localhost
DB_PORT=3306
DB_NAME=fullstack-3
DB_USERNAME=root
DB_PASSWORD=your_password_here
SERVER_PORT=8081

# ============================================
# 프론트엔드 (Vite/React) 설정
# ============================================
VITE_API_URL=http://localhost:8081
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
VITE_PUBLIC_DATA_API_KEY=your_public_data_api_key_here
```

## 🔧 설정 방법

### 방법 1: 수동 생성

1. 프로젝트 루트 디렉토리로 이동
2. `.env` 파일 생성
3. 위의 내용을 복사하여 붙여넣기
4. 실제 값으로 변경 (특히 `DB_PASSWORD`, API 키들)

**Windows PowerShell:**
```powershell
cd C:\kdt_history\KDT_MULTICAMPUS
New-Item -ItemType File -Path ".env"
# 그런 다음 파일을 열어 위 내용을 입력하세요
```

**Linux/Mac:**
```bash
cd /path/to/KDT_MULTICAMPUS
touch .env
# 그런 다음 파일을 열어 위 내용을 입력하세요
```

### 방법 2: 시스템 환경 변수로 설정

시스템 환경 변수로도 설정할 수 있습니다:

**Windows PowerShell:**
```powershell
$env:DB_HOST="localhost"
$env:DB_PORT="3306"
$env:DB_NAME="fullstack-3"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_password"
$env:SERVER_PORT="8081"
$env:VITE_API_URL="http://localhost:8081"
$env:VITE_OPENWEATHER_API_KEY="your_key"
$env:VITE_PUBLIC_DATA_API_KEY="your_key"
```

**Linux/Mac:**
```bash
export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=fullstack-3
export DB_USERNAME=root
export DB_PASSWORD=your_password
export SERVER_PORT=8081
export VITE_API_URL=http://localhost:8081
export VITE_OPENWEATHER_API_KEY=your_key
export VITE_PUBLIC_DATA_API_KEY=your_key
```

## 📝 환경 변수 설명

### 백엔드 (Spring Boot)

- `DB_HOST`: MySQL 서버 주소 (기본값: localhost)
- `DB_PORT`: MySQL 포트 (기본값: 3306)
- `DB_NAME`: 데이터베이스 이름 (기본값: fullstack-3)
- `DB_USERNAME`: MySQL 사용자명 (기본값: root)
- `DB_PASSWORD`: MySQL 비밀번호 (**필수**)
- `SERVER_PORT`: 백엔드 서버 포트 (기본값: 8081)

### 프론트엔드 (Vite/React)

- `VITE_API_URL`: 백엔드 API URL (기본값: http://localhost:8081)
- `VITE_OPENWEATHER_API_KEY`: OpenWeatherMap API 키 (날씨 정보용)
- `VITE_PUBLIC_DATA_API_KEY`: 공공데이터포털 API 키 (공휴일 정보용)

**참고**: Vite는 `VITE_` 접두사가 있는 환경 변수만 클라이언트 코드에서 사용 가능합니다.

## ⚠️ 주의사항

1. **`.env` 파일은 절대 Git에 커밋하지 마세요!**
   - `.env` 파일은 `.gitignore`에 포함되어 있습니다.
   - 실제 비밀번호와 API 키가 노출될 수 있습니다.

2. **프론트엔드 환경 변수**
   - `VITE_` 접두사가 있는 변수는 클라이언트 번들에 포함됩니다.
   - 민감한 정보는 백엔드에서만 관리하세요.

3. **API 키 발급**
   - OpenWeatherMap: https://openweathermap.org/api
   - 공공데이터포털: https://www.data.go.kr

## 🚀 확인 방법

### 백엔드 테스트

```bash
cd backend
./gradlew bootRun
# 또는 Windows에서
gradlew.bat bootRun
```

서버가 `http://localhost:8081`에서 실행되면 성공입니다!

### 프론트엔드 테스트

```bash
cd frontend
npm install
npm run dev
```

프론트엔드가 `http://localhost:3000`에서 실행되고, 백엔드와 통신하면 성공입니다!

## 🔍 문제 해결

### 백엔드가 환경 변수를 못 읽는 경우

1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. 파일 경로와 이름이 정확한지 확인 (`.env` - 점으로 시작)
3. 환경 변수 이름이 정확한지 확인 (대소문자 구분)

### 프론트엔드가 환경 변수를 못 읽는 경우

1. 환경 변수에 `VITE_` 접두사가 있는지 확인
2. 서버를 재시작 (환경 변수 변경 시 반드시 재시작 필요)
3. 브라우저 캐시 삭제

## 📚 참고

- [Spring Boot Environment Variables](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

