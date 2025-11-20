# 엔드포인트 연결 상태 확인

## ✅ 정상 연결된 엔드포인트

### 사용자 관리
- ✅ `POST /api/users/signup` - 회원가입
- ✅ `POST /api/users/login` - 로그인
- ✅ `POST /api/users/logout` - 로그아웃
- ✅ `POST /api/users/checkUserId` - 아이디 중복 확인
- ✅ `GET /api/users/userId/{userId}` - 사용자 정보 조회

### 프로필 관리
- ✅ `GET /api/users/{userId}/profile` - 프로필 조회
- ✅ `PUT /api/users/{userId}/nickname` - 닉네임 수정
- ✅ `PUT /api/users/{userId}/introduce` - 자기소개 수정

### 일정 관리
- ✅ `GET /api/home?userId={userId}` - 홈 데이터 조회
- ✅ `GET /api/schedules/user/{userId}` - 일정 목록
- ✅ `POST /api/schedules` - 일정 생성
- ✅ `PUT /api/schedules/{scheduleId}` - 일정 수정
- ✅ `DELETE /api/schedules/{scheduleId}` - 일정 삭제

### 루틴 관리
- ✅ `GET /api/routines/user/{userId}` - 루틴 목록
- ✅ `POST /api/routines` - 루틴 생성
- ✅ `PUT /api/routines/{routineId}` - 루틴 수정
- ✅ `DELETE /api/routines/{routineId}` - 루틴 삭제
- ✅ `GET /api/routines/user/{userId}/logs?log_date={date}` - 루틴 로그 조회
- ✅ `POST /api/routines/logs` - 루틴 로그 저장
- ✅ `GET /api/routines/stats/user/{userId}/weekly` - 주간 통계
- ✅ `GET /api/routines/stats/user/{userId}/monthly` - 월간 통계

### 목표 관리
- ✅ `GET /api/goals/user/{userId}` - 목표 목록
- ✅ `GET /api/goals/{goalId}/tasks` - 작업 목록
- ✅ `GET /api/goals/{goalId}/tasks/date?task_date={date}` - 날짜별 작업
- ✅ `POST /api/goals/{goalId}/tasks` - 작업 추가
- ✅ `PUT /api/goals/tasks/{taskId}` - 작업 수정
- ✅ `DELETE /api/goals/tasks/{taskId}` - 작업 삭제
- ✅ `GET /api/goals/{goalId}/total-time?month={month}` - 월별 시간

### 다이어리
- ✅ `GET /api/diaries/user/{userId}/date?diary_date={date}` - 날짜별 다이어리
- ✅ `POST /api/diaries` - 다이어리 생성/수정
- ✅ `GET /api/diaries/user/{userId}/average-rating?startDate={start}&endDate={end}` - 평균 별점

### 파일 업로드
- ✅ `POST /api/upload/image` - 이미지 업로드

### 포인트 관리
- ✅ `GET /api/reward/{userId}` - 포인트 조회
- ✅ `PUT /api/reward/{userId}` - 포인트 업데이트

---

## ⚠️ 연결되지 않은 엔드포인트

### 프로필 관련
- ❌ `POST /YOUR_BACKEND_API/check-password` - 비밀번호 확인 (CheckPwdModal.jsx)
- ❌ `POST /YOUR_BACKEND_API/change-password` - 비밀번호 변경 (EditPwd.jsx)
- ❌ `DELETE /YOUR_BACKEND_API/delete-account` - 계정 삭제 (ByePwdModal.jsx)
- ❌ `POST /YOUR_BACKEND_API/upload-image` - 프로필 이미지 업로드 (EditImg.jsx)

### 루틴 관련
- ❌ `GET /api/routines` - 루틴 목록 (RoutinePage.jsx - 사용되지 않는 파일)

---

## 🔧 추가 구현이 필요한 기능

### 1. 비밀번호 관리 API
```java
// UserController에 추가 필요
@PostMapping("/check-password")
public ResponseEntity<?> checkPassword(@RequestBody Map<String, String> request) {
    // 비밀번호 확인 로직
}

@PostMapping("/change-password")
public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
    // 비밀번호 변경 로직
}
```

### 2. 계정 삭제 API
```java
// UserController에 추가 필요
@DeleteMapping("/{userId}/delete")
public ResponseEntity<?> deleteAccount(@PathVariable Integer userId) {
    // 계정 삭제 로직
}
```

### 3. 프로필 이미지 업로드 API
- 이미 FileUploadController에 `/api/upload/image`가 있지만
- 프로필 전용 엔드포인트가 필요할 수 있음

---

## 📊 연결 상태 요약

- **정상 연결**: 30개 이상
- **미연결**: 4개 (비밀번호 관련, 계정 삭제, 프로필 이미지)
- **사용되지 않는 파일**: RoutinePage.jsx (Routine.js 사용 중)

---

## 🎯 권장 사항

1. **비밀번호 관리 기능 구현** - 보안상 중요
2. **계정 삭제 기능 구현** - 사용자 요청 대응
3. **프로필 이미지 업로드 연결** - 사용자 경험 개선
4. **사용되지 않는 파일 정리** - 코드 정리

