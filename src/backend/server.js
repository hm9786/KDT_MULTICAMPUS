import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as UserController from './controllers/UserController.js';
import * as RewardController from './controllers/RewardController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public')));

// API 라우트
app.get("/users/:userId", UserController.getUser);
app.get("/users/:userId/profile", UserController.getUserProfile);
app.put("/users/:id/nickname", UserController.updateNickname);
app.put("/users/:id/introduce", UserController.updateIntroduce);

app.put("/reward/:userId", RewardController.updateRewardPoints);
app.get("/reward/:userId", RewardController.getRewardPoints);

// 모든 요청에 대해 React 앱의 index.html 파일 제공
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

// 서버 가동
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 가동 중입니다.`);
});
