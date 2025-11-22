# 📅 테마별 일정 관리 시스템

모드 선택이 가능한 올인원 일정 관리 시스템입니다. 루틴 관리형, 목표 달성형, 다이어리형 세 가지 모드를 제공하여 사용자의 다양한 니즈를 충족시킵니다.

## 📁 프로젝트 구조

```
KDT_MULTICAMPUS/
├── backend/                    # Spring Boot 백엔드 (Gradle)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/test23/
│   │   │   │   ├── config/     # 설정 파일
│   │   │   │   ├── controller/ # REST API 컨트롤러
│   │   │   │   ├── entity/     # 엔티티 클래스
│   │   │   │   ├── mappers/    # MyBatis 매퍼 인터페이스
│   │   │   │   ├── service/    # 비즈니스 로직
│   │   │   │   └── Test23Application.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── mapper/     # MyBatis XML 매퍼
│   │   └── test/
│   ├── build.gradle
│   ├── settings.gradle
│   └── database_schema.sql
│
├── frontend/                   # React 프론트엔드 (Vite)
│   ├── src/
│   │   ├── bbs/component/     # React 컴포넌트
│   │   │   ├── pages/         # 페이지 컴포넌트
│   │   │   ├── style/         # CSS 파일
│   │   │   └── ui/            # 공통 UI 컴포넌트
│   │   ├── utils/             # 유틸리티
│   │   ├── App.js
│   │   └── index.js
│   ├── public/                # 정적 파일
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ✨ 주요 기능

### 🎯 3가지 모드 선택

#### 1. 루틴 관리형
- 매일의 루틴을 정립하고 한눈에 확인
- 시간에 맞춘 알림 제공
- 실천 여부 O/X 표기
- 주간/월간 통계 및 차트 시각화
- 달성률에 따른 포인트 지급

#### 2. 목표 달성형
- 일/주/월/년간 목표 설정 및 관리
- 타이머 기능으로 실제 소요 시간 추적
- D-day 계산 및 표시
- 달력에 색상으로 달성 정도 표현
- 주간/월간 시간 소요 그래프
- 작업 완료/미완료 자동 정렬

#### 3. 다이어리형
- 하루를 기록하는 일기 형식의 일정 관리
- 날씨 API 연동 (OpenWeatherMap)
- 별점 평가 (0-5점)
- 사진 첨부 기능
- 주간/월간 평균 별점 표시
- 일주일 연속 작성 시 보너스 포인트 (50p)

## 🛠 기술 스택

### Backend
- **Spring Boot 2.7.18** - RESTful API 서버
- **MyBatis** - SQL 매퍼
- **Spring Security** - 보안 및 인증
- **MySQL** - 데이터베이스
- **Gradle** - 빌드 도구

### Frontend
- **React 18** - UI 프레임워크
- **Vite** - 빌드 도구
- **Axios** - HTTP 클라이언트
- **React Router** - 라우팅
- **Styled Components** - 스타일링

## 📦 설치 및 실행

### 사전 요구사항
- Node.js (v14 이상)
- Java 11 이상
- Gradle (또는 Gradle Wrapper 사용)
- MySQL 8.0 이상

### 1. 데이터베이스 설정

```bash
# MySQL에 접속하여 데이터베이스 생성
mysql -u root -p
CREATE DATABASE fullstack-3;
USE fullstack-3;

# 스키마 실행
source backend/database_schema.sql;
```

### 2. Backend 설정 및 실행

```bash
cd backend

# application.properties 파일 수정 (필요시)
# src/main/resources/application.properties

# Gradle 빌드 및 실행
./gradlew bootRun
# 또는 Windows에서
gradlew.bat bootRun
```

백엔드는 `http://localhost:8081`에서 실행됩니다.

### 3. Frontend 설정 및 실행

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

프론트엔드는 `http://localhost:3000`에서 실행됩니다.

## 📝 환경 설정

### Backend & Frontend (환경 변수 설정)

프로젝트 최상위 디렉토리(`KDT_MULTICAMPUS/`)에 `.env` 파일을 생성하고 다음 내용을 입력하세요:

```bash
# 백엔드 설정
DB_HOST=localhost
DB_PORT=3306
DB_NAME=fullstack-3
DB_USERNAME=root
DB_PASSWORD=your_password
SERVER_PORT=8081

# 프론트엔드 설정
VITE_API_URL=http://localhost:8081
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_PUBLIC_DATA_API_KEY=your_public_data_api_key
```

자세한 설정 방법은 `ENV_SETUP.md` 파일을 참고하세요.

### Frontend (vite.config.js)

프록시 설정이 이미 구성되어 있습니다:
- 프론트엔드: `http://localhost:3000`
- 백엔드: `http://localhost:8081`

## 🚀 빌드

### Backend 빌드

```bash
cd backend
./gradlew build
```

### Frontend 빌드

```bash
cd frontend
npm run build
```

빌드 결과물은 `frontend/build` 디렉토리에 생성됩니다.

## 📄 라이센스

ISC
