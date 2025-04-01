import * as UserMapper from '../mapper/UserMapper.js';

// 사용자 정보 조회
export function getUser(req, res) {
    const { userId } = req.params;
    UserMapper.getUserById(userId, (err, result) => {
        if (err) {
            console.error("회원 정보 조회 오류:", err);
            return res.status(500).send("회원 정보 조회 실패");
        }
        res.json(result[0]);
    });
}

// 프로필 조회
export function getUserProfile(req, res) {
    const { userId } = req.params;
    UserMapper.getUserProfile(userId, (err, result) => {
        if (err) {
            console.error("프로필 조회 중 오류 발생:", err);
            return res.status(500).send("프로필 조회 실패");
        }
        if (result.length === 0) {
            return res.status(404).send("사용자를 찾을 수 없습니다.");
        }
        res.json(result[0]);
    });
}

// 닉네임 업데이트
export function updateNickname(req, res) {
    const { userId } = req.params;
    const { nickname } = req.body;
    UserMapper.updateNickname(userId, nickname, (err) => {
        if (err) {
            console.error("닉네임을 업데이트하는 데 실패했습니다:", err);
            return res.status(500).send("닉네임을 업데이트하는 데 실패했습니다.");
        }
        res.sendStatus(200);
    });
}

// introduce 업데이트
export function updateIntroduce(req, res) {
    const { userId } = req.params;
    const { introduce } = req.body;
    UserMapper.updateIntroduce(userId, introduce, (err) => {
        if (err) {
            console.error("자기소개를 업데이트하는 데 실패했습니다:", err);
            return res.status(500).send("자기소개를 업데이트하는 데 실패했습니다.");
        }
        res.sendStatus(200);
    });
}
