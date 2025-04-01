import db from '../database/db.js';

// reward 업데이트
export const updateRewardPoints = (userId, point, callback) => {
    const sql = `UPDATE reward SET point = ? WHERE user_UN = ?`;
    db.query(sql, [point, userId], callback);
};

// reward 불러오기,조회
export const getRewardPoints = (userId, callback) => {
    const sql = `SELECT user_UN, points FROM reward WHERE user_UN = ?`;
    db.query(sql, [userId], callback);
};

