# 프로젝트 구현 완료 가이드

## 완료된 작업

### 1. 데이터베이스 스키마
- `database_schema.sql` 파일 생성 완료
- 모든 테이블 구조 정의 (user, profile, reward, schedule, routine, routine_log, goal, goal_task, diary)

### 2. Spring Boot 백엔드 API
다음 API들이 모두 구현되었습니다:

#### User API (`/api/users`)
- POST `/signup` - 회원가입
- POST `/login` - 로그인
- POST `/logout` - 로그아웃
- GET `/userId/{userId}` - 사용자 정보 조회
- GET `/{userId}/profile` - 프로필 조회
- PUT `/{userId}/nickname` - 닉네임 업데이트
- PUT `/{userId}/introduce` - 자기소개 업데이트
- POST `/checkUserId` - 아이디 중복 확인

#### Reward API (`/api/reward`)
- GET `/{userId}` - 포인트 조회
- PUT `/{userId}` - 포인트 업데이트

#### Schedule API (`/api/schedules`)
- GET `/user/{userId}` - 사용자의 모든 일정 조회
- GET `/user/{userId}/range` - 날짜 범위별 일정 조회
- GET `/{scheduleId}` - 일정 상세 조회
- POST `/` - 일정 생성
- PUT `/{scheduleId}` - 일정 수정
- DELETE `/{scheduleId}` - 일정 삭제

#### Routine API (`/api/routines`)
- GET `/user/{userId}` - 사용자의 모든 루틴 조회
- GET `/{routineId}` - 루틴 상세 조회
- POST `/` - 루틴 생성
- PUT `/{routineId}` - 루틴 수정
- DELETE `/{routineId}` - 루틴 삭제
- GET `/user/{userId}/logs` - 루틴 로그 조회
- POST `/logs` - 루틴 로그 저장

#### Goal API (`/api/goals`)
- GET `/user/{userId}` - 사용자의 모든 목표 조회
- GET `/{goalId}` - 목표 상세 조회
- POST `/` - 목표 생성
- PUT `/{goalId}` - 목표 수정
- DELETE `/{goalId}` - 목표 삭제
- GET `/{goalId}/tasks` - 목표의 모든 작업 조회
- GET `/{goalId}/tasks/date` - 특정 날짜의 작업 조회
- POST `/{goalId}/tasks` - 작업 생성
- PUT `/tasks/{taskId}` - 작업 수정
- DELETE `/tasks/{taskId}` - 작업 삭제
- GET `/{goalId}/total-time` - 월별 누적 시간 조회

#### Diary API (`/api/diaries`)
- GET `/user/{userId}` - 사용자의 모든 다이어리 조회
- GET `/user/{userId}/date` - 특정 날짜의 다이어리 조회
- GET `/{diaryId}` - 다이어리 상세 조회
- POST `/` - 다이어리 생성/수정
- PUT `/{diaryId}` - 다이어리 수정
- DELETE `/{diaryId}` - 다이어리 삭제
- GET `/user/{userId}/average-rating` - 주간 평균 별점 조회

#### Home API (`/api/home`)
- GET `/?userId={userId}` - 홈 화면 데이터 조회 (일정, 루틴, 목표, 다이어리, 포인트)

### 3. React 프론트엔드
- Login/Signup 페이지 - Spring Boot API 연결 완료
- MainPage (Calendar) - 일정 관리 기능 연결 완료
- Profile 페이지 - 프로필 조회/수정 연결 완료
- Routine 페이지 - 루틴 관리 기능 연결 완료
- Goal 페이지 - 라우트 추가 완료 (추가 구현 필요)
- Diary 페이지 - 라우트 추가 완료 (추가 구현 필요)

## 실행 방법

### 1. 데이터베이스 설정
```sql
-- database_schema.sql 파일을 실행하여 테이블 생성
source database_schema.sql;
```

### 2. Spring Boot 실행
```bash
# Spring Boot는 포트 8001에서 실행됩니다
# application.properties에서 데이터베이스 연결 정보 확인
```

### 3. React 실행
```bash
npm install
npm start
# React는 포트 3000에서 실행됩니다
```

## 추가 구현 필요 사항

### 1. Goal 페이지 완성
- Goal 페이지를 Spring Boot API에 연결
- D-day 계산 및 표시
- 타이머 기능 구현
- 달력에 작업 표시
- 작업 리스트 관리

### 2. Diary 페이지 완성
- 날씨 API 연동 (OpenWeatherMap)
- 다이어리 작성 기능
- 별점 평가 기능
- 사진 업로드 기능
- 주간 통계 표시

### 3. 보상 시스템 구현
- 루틴 달성률에 따른 포인트 지급
- 목표 달성률에 따른 포인트 지급
- 다이어리 작성 시 포인트 지급
- 주간 연속 작성 보너스 포인트
- 레벨업 시스템 (씨앗 → 새싹 → 묘목 → 나무 → 꽃 → 열매)

### 4. 프로필 이미지 업로드
- 파일 업로드 기능 구현
- 이미지 저장 및 경로 관리

### 5. 일정 모달 기능
- 일정 추가 시 모드 선택 (기본, 루틴, 목표, 다이어리)
- 지도 API 연동 (위치 선택)
- 날짜 범위 선택 기능

## 주의사항

1. **CORS 설정**: Spring Boot의 `WebConfig.java`에서 CORS 설정이 되어 있습니다.
2. **데이터베이스 연결**: `application.properties`에서 데이터베이스 연결 정보를 확인하세요.
3. **API Base URL**: React에서 `src/utils/api.js`에 API 기본 URL이 설정되어 있습니다.
4. **userId 관리**: localStorage에서 userId를 관리하며, 로그인 시 자동으로 설정됩니다.

## 테스트 체크리스트

- [ ] 회원가입/로그인 기능
- [ ] 프로필 조회/수정
- [ ] 일정 추가/수정/삭제
- [ ] 루틴 추가/수정/삭제/완료 체크
- [ ] 목표 추가/수정/삭제
- [ ] 다이어리 작성/수정/삭제
- [ ] 포인트 조회 및 업데이트
- [ ] 홈 화면 데이터 로드

