import * as RewardMapper from '../mapper/RewardMapper.js';


// reward 업데이트
export const updateRewardPoints = (req, res) => {
    const { userId } = req.params;
    const { point } = req.body;

    if (point === undefined) {
        return res.status(400).send("보상 포인트를 입력해주세요.");
    }

    RewardMapper.updateRewardPoints(userId, point, (err, result) => {
        if (err) {
            console.error("보상 포인트 변경 중 오류 발생:", err);
            return res.status(500).send("포인트 변경 실패");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("해당 사용자를 찾을 수 없습니다.");
        }
        res.send("보상 포인트 변경 성공");
    });

    
};



// export const getRewardPoints = (req, res) => {
//     const { userId } = req.params;
//     console.log("Received userId:", userId);  // userId가 제대로 전달되었는지 확인

//     RewardMapper.getRewardPoints(userId, (err, results) => {
//         if (err) {
//             console.error("보상 포인트 조회 중 오류 발생:", err); // 실제 에러를 콘솔에 출력
//             return res.status(500).send("보상 포인트 조회 실패");
//         }

//         if (results.length === 0) {
//             return res.status(404).send("해당 사용자를 찾을 수 없습니다.");
//         }
//         const { point } = results[0];
//         res.send({ point });
//     });
// };

export const getRewardPoints = (req, res) => {
    const { userId } = req.params;
    RewardMapper.getRewardPoints(userId, (err, results) => {
        if (err) {
            console.error("보상 포인트 조회 중 오류 발생:", err);
            return res.status(500).json({ message: "보상 포인트 조회 실패" }); // JSON 형식으로 에러 응답
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "해당 사용자를 찾을 수 없습니다." }); // JSON 형식으로 에러 응답
        }
        const { points } = results[0];
        res.json({ points }); // JSON 형식으로 응답 전송
    });
};
