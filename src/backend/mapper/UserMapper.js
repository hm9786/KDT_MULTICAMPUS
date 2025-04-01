import db from '../database/db.js';


// 사용자 정보 조회
export function getUserById(userId, callback) {
    const sql = "SELECT user_name, nickname, user_id FROM `user` WHERE user_UN = ?";
    db.query(sql, [userId], callback);
}

// 프로필 조회
export function getUserProfile(userId, callback) {
    const sql = `
        SELECT u.user_name, p.nickname, p.introduce, p.profile_picture 
        FROM user u
        JOIN profile p ON u.user_UN = p.user_UN
        WHERE u.user_UN = ?
    `;
    db.query(sql, [userId], callback);
}

// 닉네임 업데이트
export function updateNickname(userId, nickname, callback) {
    const sql = 'UPDATE profile SET nickname = ? WHERE user_UN = ?'; // 상수면 변경가능-고칠거
    db.query(sql, [nickname, userId], callback);
}

// introduce 업데이트
export function updateIntroduce(userId, introduce, callback) {
    const sql = 'UPDATE profile SET introduce = ? WHERE user_UN = ?';
    db.query(sql, [introduce, userId], callback);
}
