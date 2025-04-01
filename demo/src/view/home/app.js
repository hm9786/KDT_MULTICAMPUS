import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';


// Express 앱 설정
const app = express();
app.use(bodyParser.json());

// 포트 설정
const PORT = 3000;

// MySQL 데이터베이스 연결
const db = mysql.createConnection({
    host: 'db-pdule-kr.vpc-pub-cdb.ntruss.com', // Naver Cloud MySQL 호스트 주소
    user: 'fullstack-ch',
    password: 'tmd0509!',
    database: 'fullstack-3',
    port: 3306 
});



db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
    } else {
        console.log('MySQL 연결 성공');
    }
});



// // 라우터 연결 (라우터 파일 route/home/index.js)
// const home = require("./view/home");
// app.use("/", home); // use -> 미들웨어 등록

// 회원가입 라우트
app.post("/users/new-user", (req, res) => {
    const { user_name, password, nickname, user_id } = req.body; // 클라이언트에서 보낸 데이터
    
    // 필수 필드 확인
    if (!user_name || !password || !nickname || !user_id) {
        return res.status(400).send('모든 필드를 입력해주세요.'); //잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미
    }

    // INSERT 쿼리 실행
    const sql = "INSERT INTO `user` (user_name, password, nickname, user_id) VALUES (?, ?, ?, ?)";
    db.query(sql, [user_name, password, nickname, user_id], (err, result) => {
        if (err) {
            console.error('회원가입 중 오류 발생:', err);
            return res.status(500).send('회원가입 실패');//서버 처리 에러
        }
        console.log('새로운 사용자 추가:', result.insertId);
        res.status(201).send('회원가입 성공');//요청 성공 새로운 리소스 생성
    });
});



// 로그인 처리
app.post("/users/login", (req, res) => {
    const { user_id, password } = req.body;

    if (!user_id || !password) {
        return res.status(400).send("아이디와 비밀번호를 입력해주세요.");//잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미ㅍ
    }

    const sql = "SELECT * FROM `user` WHERE user_id = ? AND password = ?";
    db.query(sql, [user_id, password], (err, result) => {
        if (err) {
            console.error("로그인 오류:", err);
            return res.status(500).send("로그인 실패");//서버 처리 에러
        }
        if (result.length > 0) {
            res.send("로그인 성공");
        } else {
            res.status(401).send("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다."); //해당 리소스에 유효한 인증 자격 증명이 없어 발생한 것
        }
    });
});

// 회원 탈퇴 처리
app.delete("/users/:userId", (req, res) => {
    const { userId } = req.params;

    const sql = "DELETE FROM `user` WHERE user_UN = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("회원 탈퇴 오류:", err);
            return res.status(500).send("회원 탈퇴 실패");//서버 처리 에러
        }
        res.send("회원 탈퇴 성공");
    });
});

// 회원 정보 수정
app.put("/users/:userId", (req, res) => {
    const { userId } = req.params;
    const { user_name, nickname, password } = req.body;

    if (!user_name || !nickname || !password) {
        return res.status(400).send("모든 필드를 입력해주세요.");//잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미
    }

    const sql = "UPDATE `user` SET user_name = ?, nickname = ?, password = ? WHERE user_UN = ?";
    db.query(sql, [user_name, nickname, password, userId], (err, result) => {
        if (err) {
            console.error("회원 정보 수정 오류:", err);
            return res.status(500).send("회원 정보 수정 실패");//서버 처리 에러
        }
        res.send("회원 정보 수정 성공");
    });
});

// 회원 정보 조회
app.get("/users/:userId", (req, res) => {
    const { userId } = req.params;

    const sql = "SELECT user_name, nickname, user_id FROM `user` WHERE user_UN = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("회원 정보 조회 오류:", err);
            return res.status(500).send("회원 정보 조회 실패");//서버 처리 에러
        }
        res.json(result[0]);
    });
});

// 비밀번호 초기화
app.post("/users/reset-password", (req, res) => {
    const { user_id, new_password } = req.body;

    if (!user_id || !new_password) {
        return res.status(400).send("아이디와 새로운 비밀번호를 입력해주세요.");//잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미
    }

    const sql = "UPDATE `user` SET password = ? WHERE user_id = ?";
    db.query(sql, [new_password, user_id], (err, result) => {
        if (err) {
            console.error("비밀번호 초기화 오류:", err);
            return res.status(500).send("비밀번호 초기화 실패");//서버 처리 에러
        }
        res.send("비밀번호 초기화 성공");
    });
});


// 홈페이지
// 홈 화면
app.get("/home", (req, res) => {
    console.log("홈페이지");
});

// 일정 추가 (POST 요청)
app.post("/home/events", (req, res) => {
    const { schedule_id, title, description, start_time, end_time, unique_number, mode, location, notification, user_UN } = req.body;

    if (!schedule_id || !user_UN) {
        return res.status(400).send("필수 필드인 schedule_id와 user_UN이 필요합니다.");//잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미
    }

    const sql = `INSERT INTO schedule (schedule_id, title, description, start_time, end_time, unique_number, mode, location, notification, user_UN) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [schedule_id, title, description, start_time, end_time, unique_number, mode, location, notification, user_UN];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('일정 추가 중 오류 발생:', err);
            return res.status(500).send('일정 추가 실패');//서버 처리 에러
        }
        console.log('새로운 일정 추가:', result.insertId);
        res.status(201).send('일정 추가 성공');//요청 성공 새로운 리소스 생성
    });
});

// 일정 수정 (PUT 요청)
app.put("/home/events/:eventId", (req, res) => {
    const { eventId } = req.params;
    const { title, description, start_time, end_time, unique_number, mode, location, notification } = req.body;

    const sql = `UPDATE schedule SET title = ?, description = ?, start_time = ?, end_time = ?, unique_number = ?, mode = ?, location = ?, notification = ? 
                 WHERE schedule_id = ?`;
    const values = [title, description, start_time, end_time, unique_number, mode, location, notification, eventId];
    
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('일정 수정 중 오류 발생:', err);
            return res.status(500).send('일정 수정 실패');//서버 처리 에러
        }
        res.send('일정 수정 성공');
    });
});

// 일정 삭제 (DELETE 요청)
app.delete("/home/events/:eventId", (req, res) => {
    const { eventId } = req.params;

    const sql = "DELETE FROM schedule WHERE schedule_id = ?";
    
    db.query(sql, [eventId], (err, result) => {
        if (err) {
            console.error('일정 삭제 중 오류 발생:', err);
            return res.status(500).send('일정 삭제 실패');//서버 처리 에러
        }
        res.send('일정 삭제 성공');
    });
});
// 프로필
// 프로필 조회
app.get("/users/:userId/profile", (req, res) => {
    const { userId } = req.params;

    const sql = "SELECT user_name, nickname FROM `user` WHERE user_UN = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("프로필 조회 중 오류 발생:", err);
            return res.status(500).send("프로필 조회 실패");
        }
        res.json(result[0]);
    });
});

// 프로필 수정
app.put("/users/:userId/profile", (req, res) => {
    const { userId } = req.params;
    const { user_name, nickname } = req.body;

    if (!user_name || !nickname) {
        return res.status(400).send("이름과 닉네임을 입력해주세요.");
    }

    const sql = "UPDATE `user` SET user_name = ?, nickname = ? WHERE user_UN = ?";
    db.query(sql, [user_name, nickname, userId], (err, result) => {
        if (err) {
            console.error("프로필 수정 중 오류 발생:", err);
            return res.status(500).send("프로필 수정 실패");
        }
        res.send("프로필 수정 성공");
    });
});

// 프로필 사진 조회
app.get("/users/:userId/profile_picture", (req, res) => {
    const { userId } = req.params;

    // 여기서는 가정상 프로필 사진의 경로를 가져온다고 가정합니다.
    const sql = "SELECT profile_picture FROM `user` WHERE user_UN = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("프로필 사진 조회 중 오류 발생:", err);
            return res.status(500).send("프로필 사진 조회 실패");
        }
        if (result[0] && result[0].profile_picture) {
            res.json({ profile_picture: result[0].profile_picture });
        } else {
            res.status(404).send("프로필 사진을 찾을 수 없습니다.");
        }
    });
});

// 프로필 사진 삭제
app.delete("/users/:userId/profile_picture", (req, res) => {
    const { userId } = req.params;

    const sql = "UPDATE `user` SET profile_picture = NULL WHERE user_UN = ?";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("프로필 사진 삭제 중 오류 발생:", err);
            return res.status(500).send("프로필 사진 삭제 실패");
        }
        res.send("프로필 사진 삭제 성공");
    });
});

// 루틴 페이지
// 루틴 추가
app.post("/routines", (req, res) => {
    const { routine_title, routine_created_at, routine_end_at, routine_notification, routine_recycle, routine_complete, user_UN } = req.body;

    if (!routine_title || !routine_notification || !routine_recycle || !routine_complete || !user_UN) {
        return res.status(400).send("필수 필드가 누락되었습니다.");
    }

    const sql = `INSERT INTO routine (routine_title, routine_created_at, routine_end_at, routine_notification, routine_recycle, routine_complete, user_UN) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [routine_title, routine_created_at, routine_end_at, routine_notification, routine_recycle, routine_complete, user_UN], (err, result) => {
        if (err) {
            console.error("루틴 추가 중 오류 발생:", err);
            return res.status(500).send("루틴 추가 실패");
        }
        console.log('새로운 루틴 추가:', result.insertId);
        res.status(201).send("루틴 추가 성공");
    });
});

// 루틴 조회
app.get("/routines/:routineId", (req, res) => {
    const { routineId } = req.params;

    const sql = `SELECT * FROM routine WHERE routine_id = ?`;
    db.query(sql, [routineId], (err, result) => {
        if (err) {
            console.error("루틴 조회 중 오류 발생:", err);
            return res.status(500).send("루틴 조회 실패");
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send("루틴을 찾을 수 없습니다.");
        }
    });
});

// 루틴 수정
app.put("/routines/:routineId", (req, res) => {
    const { routineId } = req.params;
    const { routine_title, routine_end_at, routine_notification, routine_recycle, routine_complete } = req.body;

    const sql = `UPDATE routine SET routine_title = ?, routine_end_at = ?, routine_notification = ?, routine_recycle = ?, routine_complete = ? WHERE routine_id = ?`;
    db.query(sql, [routine_title, routine_end_at, routine_notification, routine_recycle, routine_complete, routineId], (err, result) => {
        if (err) {
            console.error("루틴 수정 중 오류 발생:", err);
            return res.status(500).send("루틴 수정 실패");
        }
        res.send("루틴 수정 성공");
    });
});

// 루틴 삭제
app.delete("/routines/:routineId", (req, res) => {
    const { routineId } = req.params;

    const sql = `DELETE FROM routine WHERE routine_id = ?`;
    db.query(sql, [routineId], (err, result) => {
        if (err) {
            console.error("루틴 삭제 중 오류 발생:", err);
            return res.status(500).send("루틴 삭제 실패");
        }
        res.send("루틴 삭제 성공");
    });
});

// 목표 페이지
app.post("/goals", (req, res) => {
    const { G_start_time, G_end_time, G_today, repeat_day, notification, user_UN } = req.body;

    if (!G_start_time || !G_end_time || !G_today || !repeat_day || notification === undefined || !user_UN) {
        return res.status(400).send("필수 필드가 누락되었습니다.");
    }

    const sql = `INSERT INTO goal (G_start_time, G_end_time, G_today, repeat_day, notification, user_UN) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [G_start_time, G_end_time, G_today, repeat_day, notification, user_UN], (err, result) => {
        if (err) {
            console.error("목표 추가 중 오류 발생:", err);
            return res.status(500).send("목표 추가 실패");
        }
        console.log('새로운 목표 추가:', result.insertId);
        res.status(201).send("목표 추가 성공");
    });
});

// 목표 조회 (GET 요청)
app.get("/goals/:goalId", (req, res) => {
    const { goalId } = req.params;

    const sql = `SELECT * FROM goal WHERE goal_UN = ?`;
    db.query(sql, [goalId], (err, result) => {
        if (err) {
            console.error("목표 조회 중 오류 발생:", err);
            return res.status(500).send("목표 조회 실패");
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send("목표를 찾을 수 없습니다.");
        }
    });
});

// 목표 수정 (PUT 요청)
app.put("/goals/:goalId", (req, res) => {
    const { goalId } = req.params;
    const { G_start_time, G_end_time, G_today, repeat_day, notification } = req.body;

    const sql = `UPDATE goal SET G_start_time = ?, G_end_time = ?, G_today = ?, repeat_day = ?, notification = ? WHERE goal_UN = ?`;
    db.query(sql, [G_start_time, G_end_time, G_today, repeat_day, notification, goalId], (err, result) => {
        if (err) {
            console.error("목표 수정 중 오류 발생:", err);
            return res.status(500).send("목표 수정 실패");
        }
        res.send("목표 수정 성공");
    });
});

// 목표 삭제 (DELETE 요청)
app.delete("/goals/:goalId", (req, res) => {
    const { goalId } = req.params;

    const sql = `DELETE FROM goal WHERE goal_UN = ?`;
    db.query(sql, [goalId], (err, result) => {
        if (err) {
            console.error("목표 삭제 중 오류 발생:", err);
            return res.status(500).send("목표 삭제 실패");
        }
        res.send("목표 삭제 성공");
    });
});

// 누적시간 표시 (GET 요청)
app.get("/TIMER/:timerId", (req, res) => {
    const { timerId } = req.params;


    const totalTime = 1440; // 미완성-- 데이터 베이스에서 누적 시간을 가져와서 설정 필요 
    res.json({ timerId, totalTime });
});

// 다이어리 페이지
// 다이어리 추가 (POST 요청)
app.post("/diary", (req, res) => {
    const { diary_goal, diary_record, diary_weather, diary_rate, user_UN, timer } = req.body;

    if (!diary_goal || !diary_record || !diary_weather || diary_rate === undefined || !user_UN) {
        return res.status(400).send("필수 필드가 누락되었습니다.");
    }

    const sql = `INSERT INTO diary (diary_goal, diary_record, diary_weather, diary_rate, user_UN, timer) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [diary_goal, diary_record, diary_weather, diary_rate, user_UN, timer], (err, result) => {
        if (err) {
            console.error("다이어리 추가 중 오류 발생:", err);
            return res.status(500).send("다이어리 추가 실패");
        }
        console.log('새로운 다이어리 추가:', result.insertId);
        res.status(201).send("다이어리 추가 성공");
    });
});

// 다이어리 조회 (GET 요청)
app.get("/diary/:diaryId", (req, res) => {
    const { diaryId } = req.params;

    const sql = `SELECT * FROM diary WHERE diary_id = ?`;
    db.query(sql, [diaryId], (err, result) => {
        if (err) {
            console.error("다이어리 조회 중 오류 발생:", err);
            return res.status(500).send("다이어리 조회 실패");
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send("다이어리를 찾을 수 없습니다.");
        }
    });
});

// 다이어리 수정 (PUT 요청)
app.put("/diary/:diaryId", (req, res) => {
    const { diaryId } = req.params;
    const { diary_goal, diary_record, diary_weather, diary_rate, timer } = req.body;

    const sql = `UPDATE diary SET diary_goal = ?, diary_record = ?, diary_weather = ?, diary_rate = ?, timer = ? 
                 WHERE diary_id = ?`;
    db.query(sql, [diary_goal, diary_record, diary_weather, diary_rate, timer, diaryId], (err, result) => {
        if (err) {
            console.error("다이어리 수정 중 오류 발생:", err);
            return res.status(500).send("다이어리 수정 실패");
        }
        res.send("다이어리 수정 성공");
    });
});

// 다이어리 삭제 (DELETE 요청)
app.delete("/diary/:diaryId", (req, res) => {
    const { diaryId } = req.params;

    const sql = `DELETE FROM diary WHERE diary_id = ?`;
    db.query(sql, [diaryId], (err, result) => {
        if (err) {
            console.error("다이어리 삭제 중 오류 발생:", err);
            return res.status(500).send("다이어리 삭제 실패");
        }
        res.send("다이어리 삭제 성공");
    });
});

// 보상 페이지
// 보상 포인트 변경 (PUT 요청)
app.put("/reward/:userId", (req, res) => {
    const { userId } = req.params;
    const { point } = req.body;

    if (point === undefined) {
        return res.status(400).send("보상 포인트를 입력해주세요.");
    }

    // 보상 포인트 업데이트 쿼리
    const sql = `UPDATE reward SET point = ? WHERE user_UN = ?`;
    db.query(sql, [point, userId], (err, result) => {
        if (err) {
            console.error("보상 포인트 변경 중 오류 발생:", err);
            return res.status(500).send("포인트 변경 실패");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("해당 사용자를 찾을 수 없습니다.");
        }
        res.send("보상 포인트 변경 성공");
    });
});

// 알림
// 알림 추가 (PUT 요청)
app.put("/api/reminders", (req, res) => {
    const { reminder_id, schedule_id, user_UN, reminder_time } = req.body;

    if (!reminder_id || !schedule_id || !user_UN) {
        return res.status(400).send("필수 필드가 누락되었습니다.");
    }

    // 알림 추가 쿼리
    const sql = `INSERT INTO reminder (reminder_id, schedule_id, user_UN, reminder_time) 
                 VALUES (?, ?, ?, ?)`;
    db.query(sql, [reminder_id, schedule_id, user_UN, reminder_time], (err, result) => {
        if (err) {
            console.error("알림 추가 중 오류 발생:", err);
            return res.status(500).send("알림 추가 실패");
        }
        console.log('새로운 알림 추가:', result.insertId);
        res.status(201).send("알림 추가 성공");
    });
});

// 알림 조회 (GET 요청)
app.get("/api/reminders/:reminder_id", (req, res) => {
    const { reminder_id } = req.params;

    // 알림 조회 쿼리
    const sql = `SELECT * FROM reminder WHERE reminder_id = ?`;
    db.query(sql, [reminder_id], (err, result) => {
        if (err) {
            console.error("알림 조회 중 오류 발생:", err);
            return res.status(500).send("알림 조회 실패");
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send("알림을 찾을 수 없습니다.");
        }
    });
});


// 서버 가동
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 가동 중입니다.`);
});
