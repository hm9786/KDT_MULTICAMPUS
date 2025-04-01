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

// 서버 가동
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 가동 중입니다.`);
});
