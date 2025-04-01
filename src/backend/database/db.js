import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const conn = mysql.createConnection({
    host: 'db-pdule-kr.vpc-pub-cdb.ntruss.com',
    user: 'fullstack-ch',
    password: 'tmd0509!',
    database: 'fullstack-3',
    port: 3306
});

conn.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
    } else {
        console.log('MySQL 연결 성공');
    }
});

export default conn;
