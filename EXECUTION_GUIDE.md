# 🚀 프로젝트 실행 가이드

이 문서는 테마별 일정 관리 시스템을 실행하는 방법을 단계별로 안내합니다.

## 📋 사전 요구사항

다음 도구들이 설치되어 있어야 합니다:

- **Node.js** (v14 이상) - [다운로드](https://nodejs.org/)
- **Java** (JDK 11 이상) - [다운로드](https://www.oracle.com/java/technologies/downloads/)
- **Maven** (3.6 이상) - [다운로드](https://maven.apache.org/download.cgi)
- **MySQL** (8.0 이상) - [다운로드](https://dev.mysql.com/downloads/mysql/)

## 🔧 실행 순서

### 1단계: 데이터베이스 설정

#### 1-1. MySQL 서버 실행
```bash
# Windows (서비스로 실행 중이어야 함)
# MySQL 서비스가 실행 중인지 확인

# MySQL 접속
mysql -u root -p
```

#### 1-2. 데이터베이스 및 스키마 생성
```sql
-- MySQL 접속 후 실행
CREATE DATABASE IF NOT EXISTS fullstack-3;
USE fullstack-3;

-- 스키마 파일 실행
-- MySQL 명령줄에서:
source database_schema.sql;

-- 또는 직접 SQL 파일 내용을 복사하여 실행
```

#### 1-3. 데이터베이스 연결 확인
```sql
-- 테이블이 생성되었는지 확인
SHOW TABLES;

-- 예상 결과:
-- user, profile, reward, schedule, routine, routine_log, goal, goal_task, diary
```

### 2단계: Spring Boot 백엔드 설정 및 실행

#### 2-1. 데이터베이스 연결 정보 확인
`src/main/resources/application.properties` 파일을 열어 데이터베이스 정보를 확인합니다:

```properties
spring.datasource.url=jdbc:mysql://db-pdule-kr.vpc-pub-cdb.ntruss.com:3306/fullstack-3
spring.datasource.username=fullstack-3
spring.datasource.password=fullstack-3
```

**로컬 MySQL을 사용하는 경우:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fullstack-3
spring.datasource.username=root
spring.datasource.password=your_password
```

#### 2-2. Spring Boot 서버 실행

**방법 1: Maven 명령어 사용 (권장)**
```bash
# 프로젝트 루트 디렉토리에서
cd src/main/java/com/example/test23
mvn spring-boot:run
```

**방법 2: IDE에서 실행**
- IntelliJ IDEA 또는 Eclipse에서 `Test23Application.java` 파일을 열고
- `Run` 버튼을 클릭하거나 `Shift + F10` (IntelliJ)

**방법 3: JAR 파일로 실행**
```bash
# 빌드
mvn clean package

# 실행
java -jar target/test23-0.0.1-SNAPSHOT.jar
```

#### 2-3. 백엔드 서버 확인
브라우저에서 다음 URL을 열어 확인:
- `http://localhost:8001/api/users/health` (헬스 체크 엔드포인트가 있다면)
- 콘솔에 "Started Test23Application" 메시지가 보이면 성공

**백엔드 서버는 `http://localhost:8001`에서 실행됩니다.**

### 3단계: React 프론트엔드 실행

#### 3-1. 의존성 설치
```bash
# 프로젝트 루트 디렉토리에서
npm install
```

#### 3-2. 프론트엔드 서버 실행
```bash
npm start
```

#### 3-3. 브라우저 확인
자동으로 브라우저가 열리며 `http://localhost:3000`에서 애플리케이션이 실행됩니다.

**프론트엔드 서버는 `http://localhost:3000`에서 실행됩니다.**

## ✅ 실행 확인

### 정상 실행 시 확인 사항

1. **백엔드 서버**
   - 콘솔에 "Started Test23Application" 메시지
   - 포트 8001에서 서버 실행 중
   - 데이터베이스 연결 성공

2. **프론트엔드 서버**
   - 브라우저에서 `http://localhost:3000` 접속 가능
   - 로그인/회원가입 페이지 표시
   - 네트워크 탭에서 API 호출이 정상적으로 이루어짐

## 🔍 문제 해결

### 백엔드 서버가 시작되지 않는 경우

1. **포트 충돌 확인**
   ```bash
   # Windows
   netstat -ano | findstr :8001
   
   # 포트를 사용 중인 프로세스 종료
   taskkill /PID [프로세스ID] /F
   ```

2. **데이터베이스 연결 오류**
   - `application.properties`의 데이터베이스 정보 확인
   - MySQL 서버가 실행 중인지 확인
   - 데이터베이스 이름과 사용자 정보 확인

3. **Maven 의존성 오류**
   ```bash
   mvn clean install
   ```

### 프론트엔드 서버가 시작되지 않는 경우

1. **포트 충돌 확인**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   ```

2. **의존성 설치 오류**
   ```bash
   # node_modules 삭제 후 재설치
   rm -rf node_modules
   npm install
   ```

3. **프록시 설정 확인**
   - `package.json`의 `proxy` 필드가 `http://localhost:8001`로 설정되어 있는지 확인

### API 호출이 실패하는 경우

1. **CORS 오류**
   - `WebConfig.java`에서 CORS 설정 확인
   - `http://localhost:3000`이 허용되어 있는지 확인

2. **API 엔드포인트 확인**
   - `src/utils/api.js`에서 `API_BASE_URL`이 `http://localhost:8001/api`로 설정되어 있는지 확인

## 📝 실행 순서 요약

```bash
# 1. 데이터베이스 설정
mysql -u root -p
# SQL 파일 실행

# 2. 백엔드 실행 (새 터미널)
cd src/main/java/com/example/test23
mvn spring-boot:run

# 3. 프론트엔드 실행 (새 터미널)
cd [프로젝트 루트]
npm install
npm start
```

## 🎯 빠른 시작 (이미 설정된 경우)

```bash
# 터미널 1: 백엔드
cd src/main/java/com/example/test23
mvn spring-boot:run

# 터미널 2: 프론트엔드
npm start
```

## 📞 추가 도움말

- 데이터베이스 스키마: `database_schema.sql` 파일 참조
- API 엔드포인트: `ENDPOINT_COMPLETE.md` 파일 참조
- 구현 상태: `IMPLEMENTATION_COMPLETE.md` 파일 참조

