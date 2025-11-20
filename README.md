# 📅 테마별 일정 관리 시스템

모드 선택이 가능한 올인원 일정 관리 시스템입니다. 루틴 관리형, 목표 달성형, 다이어리형 세 가지 모드를 제공하여 사용자의 다양한 니즈를 충족시킵니다.

![프로젝트 메인 화면](이미지)

## ✨ 주요 기능

### 🎯 3가지 모드 선택

#### 1. 루틴 관리형
- 매일의 루틴을 정립하고 한눈에 확인
- 시간에 맞춘 알림 제공
- 실천 여부 O/X 표기
- 주간/월간 통계 및 차트 시각화
- 달성률에 따른 포인트 지급

![루틴 관리 화면](이미지)

#### 2. 목표 달성형
- 일/주/월/년간 목표 설정 및 관리
- 타이머 기능으로 실제 소요 시간 추적
- D-day 계산 및 표시
- 달력에 색상으로 달성 정도 표현
- 주간/월간 시간 소요 그래프
- 작업 완료/미완료 자동 정렬

![목표 달성 화면](이미지)

#### 3. 다이어리형
- 하루를 기록하는 일기 형식의 일정 관리
- 날씨 API 연동 (OpenWeatherMap)
- 별점 평가 (0-5점)
- 사진 첨부 기능
- 주간/월간 평균 별점 표시
- 일주일 연속 작성 시 보너스 포인트 (50p)

![다이어리 화면](이미지)

### 🎁 보상 시스템
- **루틴**: 달성률에 따라 0-10p 지급
- **목표**: 달성률에 따라 0-10p 지급
- **다이어리**: 작성 시 10p, 7일 연속 작성 시 50p 보너스

### 🔔 알림 기능
- 브라우저 Notification API 활용
- 일정 시작 30분/15분/5분 전 알림
- 루틴 시간 알림

### 📊 통계 및 시각화
- 루틴 완료율 차트
- 목표 시간 소요 그래프
- 다이어리 평균 별점

## 🛠️ 기술 스택

### Frontend
- **React 18.3.1** - UI 라이브러리
- **React Router DOM** - 라우팅
- **Axios** - HTTP 클라이언트
- **React Chart.js** - 차트 시각화
- **Styled Components** - 스타일링
- **React Bootstrap** - UI 컴포넌트

### Backend
- **Spring Boot** - RESTful API 서버
- **MyBatis** - SQL 매퍼
- **MySQL** - 데이터베이스
- **Maven** - 빌드 도구

### External APIs
- **OpenWeatherMap API** - 날씨 정보

## 📦 설치 및 실행

### 사전 요구사항
- Node.js (v14 이상)
- Java 11 이상
- Maven 3.6 이상
- MySQL 8.0 이상

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/KDT_MULTICAMPUS.git
cd KDT_MULTICAMPUS
```

### 2. 데이터베이스 설정
```bash
# MySQL에 접속하여 데이터베이스 생성
mysql -u root -p
CREATE DATABASE fullstack-3;
USE fullstack-3;

# 스키마 실행
source database_schema.sql;
```

### 3. Spring Boot 설정
```properties
# src/main/resources/application.properties 파일 수정
spring.datasource.url=jdbc:mysql://localhost:3306/fullstack-3
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 4. Spring Boot 서버 실행
```bash
cd src/main/java/com/example/test23
mvn spring-boot:run
```
서버는 `http://localhost:8001`에서 실행됩니다.

### 5. React 클라이언트 실행
```bash
# 루트 디렉토리에서
npm install
npm start
```
클라이언트는 `http://localhost:3000`에서 실행됩니다.

## 📁 프로젝트 구조

```
KDT_MULTICAMPUS/
├── src/
│   ├── bbs/component/          # React 컴포넌트
│   │   ├── pages/
│   │   │   ├── home/           # 로그인/회원가입
│   │   │   ├── MainPage.jsx    # 메인 캘린더
│   │   │   └── mode/
│   │   │       ├── Routine.js   # 루틴 관리
│   │   │       ├── Gaol.js      # 목표 달성
│   │   │       └── Diary.jsx    # 다이어리
│   │   └── ui/                 # 공통 UI 컴포넌트
│   ├── main/java/com/example/test23/
│   │   ├── controller/         # REST API 컨트롤러
│   │   ├── service/            # 비즈니스 로직
│   │   ├── mapper/             # MyBatis 매퍼 인터페이스
│   │   └── entity/             # 엔티티 클래스
│   └── main/resources/
│       ├── mapper/             # MyBatis XML 매퍼
│       └── application.properties
├── database_schema.sql         # 데이터베이스 스키마
└── package.json
```

## 🎯 주요 API 엔드포인트

### 사용자 관리
- `POST /api/users/signup` - 회원가입
- `POST /api/users/login` - 로그인
- `GET /api/users/{userId}/profile` - 프로필 조회

### 일정 관리
- `GET /api/schedules/user/{userId}` - 일정 목록
- `POST /api/schedules` - 일정 생성
- `PUT /api/schedules/{scheduleId}` - 일정 수정
- `DELETE /api/schedules/{scheduleId}` - 일정 삭제

### 루틴 관리
- `GET /api/routines/user/{userId}` - 루틴 목록
- `POST /api/routines` - 루틴 생성
- `GET /api/routines/stats/user/{userId}/weekly` - 주간 통계

### 목표 관리
- `GET /api/goals/user/{userId}` - 목표 목록
- `POST /api/goals/{goalId}/tasks` - 작업 추가
- `PUT /api/goals/tasks/{taskId}` - 작업 수정

### 다이어리
- `GET /api/diaries/user/{userId}/date` - 날짜별 다이어리
- `POST /api/diaries` - 다이어리 생성/수정
- `POST /api/upload/image` - 이미지 업로드

## 💡 사용 방법

### 1. 회원가입 및 로그인
- 회원가입 페이지에서 아이디, 비밀번호, 닉네임을 입력하여 계정을 생성합니다.
- 로그인 후 메인 캘린더 페이지로 이동합니다.

### 2. 루틴 관리
- 루틴 페이지에서 매일 반복할 루틴을 추가합니다.
- 시간을 설정하면 해당 시간에 알림이 표시됩니다.
- 체크박스를 클릭하여 루틴 완료 여부를 표시합니다.
- 주간/월간 통계에서 달성률을 확인할 수 있습니다.

### 3. 목표 달성
- 목표 페이지에서 목표 제목과 목표 날짜를 설정합니다.
- 날짜별로 작업을 추가하고 타이머로 시간을 측정합니다.
- 완료된 작업은 자동으로 아래로 정렬됩니다.
- 시간 그래프에서 주간/월간 시간 소요를 확인할 수 있습니다.

### 4. 다이어리 작성
- 다이어리 페이지에서 날짜를 선택합니다.
- 날씨 정보는 자동으로 가져오며 수동 수정도 가능합니다.
- 오늘의 목표와 기록을 작성하고 별점을 평가합니다.
- 사진을 첨부하여 하루를 기록할 수 있습니다.

## 🎨 UI/UX 특징

- **직관적인 디자인**: 한눈에 알아보기 쉬운 인터페이스
- **반응형 레이아웃**: 다양한 화면 크기에 대응
- **부드러운 애니메이션**: 사용자 경험 향상
- **컬러 테마**: 베이지/갈색 계열의 따뜻한 색상

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면 다음 단계를 따라주세요:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 ISC 라이선스를 따릅니다.

## 👥 팀

- 개발자: [Your Name]
- 프로젝트 기간: 2024년

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 등록해주세요.

---

⭐ 이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!
