package com.example.test23.controller;

import com.example.test23.entity.Reward;
import com.example.test23.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/reward")
public class RewardController {

    @Autowired
    private RewardService rewardService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getRewardPoints(@PathVariable Integer userId) {
        try {
            Reward reward = rewardService.getRewardByUserId(userId);
            return ResponseEntity.ok(Map.of("points", reward.getPoints()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("포인트 조회 중 오류가 발생하였습니다.");
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<?> updateRewardPoints(@PathVariable Integer userId, @RequestBody Map<String, Integer> request) {
        try {
            Integer points = request.get("points");
            if (points == null) {
                points = request.get("point"); // 호환성을 위해 point도 지원
            }
            if (points == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("포인트를 입력해주세요.");
            }
            rewardService.updateRewardPoints(userId, points);
            return ResponseEntity.ok("포인트가 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("포인트 업데이트 중 오류가 발생하였습니다.");
        }
    }
}

