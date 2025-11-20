package com.example.test23.service;

import com.example.test23.entity.RoutineLog;
import com.example.test23.entity.GoalTask;
import com.example.test23.mappers.RoutineMapper;
import com.example.test23.mappers.GoalMapper;
import com.example.test23.mappers.DiaryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RewardCalculationService {

    @Autowired
    private RoutineMapper routineMapper;

    @Autowired
    private GoalMapper goalMapper;

    @Autowired
    private DiaryMapper diaryMapper;

    @Autowired
    private RewardService rewardService;

    /**
     * 루틴 달성률에 따른 포인트 계산
     * 0%: 0p, ~20%: 2p, ~40%: 4p, ~60%: 6p, ~80%: 8p, ~100%: 10p
     */
    public int calculateRoutinePoints(Integer user_UN, LocalDate date) {
        List<RoutineLog> logs = routineMapper.getRoutineLogsByDate(user_UN, date);
        if (logs.isEmpty()) {
            return 0;
        }

        long completedCount = logs.stream().filter(RoutineLog::getCompleted).count();
        double completionRate = (double) completedCount / logs.size() * 100;

        if (completionRate >= 100) return 10;
        if (completionRate >= 80) return 8;
        if (completionRate >= 60) return 6;
        if (completionRate >= 40) return 4;
        if (completionRate >= 20) return 2;
        return 0;
    }

    /**
     * 목표 달성률에 따른 포인트 계산
     * 0%: 0p, ~20%: 2p, ~40%: 4p, ~60%: 6p, ~80%: 8p, ~100%: 10p
     * D-day까지 평균 달성률 80% 이상이면 일수 단위로 포인트 지급
     */
    public int calculateGoalPoints(Integer goal_id, LocalDate date) {
        List<GoalTask> tasks = goalMapper.getTasksByDate(goal_id, date);
        if (tasks.isEmpty()) {
            return 0;
        }

        long completedCount = tasks.stream().filter(GoalTask::getCompleted).count();
        double completionRate = (double) completedCount / tasks.size() * 100;

        int basePoints = 0;
        if (completionRate >= 100) basePoints = 10;
        else if (completionRate >= 80) basePoints = 8;
        else if (completionRate >= 60) basePoints = 6;
        else if (completionRate >= 40) basePoints = 4;
        else if (completionRate >= 20) basePoints = 2;

        // D-day까지 평균 달성률 80% 이상이면 일수 단위로 추가 포인트
        // 이 부분은 GoalService에서 목표 정보를 가져와서 계산해야 함
        // 여기서는 기본 포인트만 반환

        return basePoints;
    }

    /**
     * 다이어리 작성 시 포인트 지급
     * 하루에 10p 지급
     */
    public int calculateDiaryPoints() {
        return 10;
    }

    /**
     * 주간 연속 다이어리 작성 보너스
     * 7일 연속 작성 시 50p 지급
     */
    public boolean checkWeeklyDiaryBonus(Integer user_UN, LocalDate date) {
        LocalDate weekAgo = date.minusDays(6);
        int consecutiveDays = 0;

        for (int i = 0; i < 7; i++) {
            LocalDate checkDate = weekAgo.plusDays(i);
            if (diaryMapper.getDiaryByDate(user_UN, checkDate) != null) {
                consecutiveDays++;
            }
        }

        return consecutiveDays == 7;
    }

    /**
     * 루틴 포인트 지급
     */
    public void awardRoutinePoints(Integer user_UN, LocalDate date) {
        int points = calculateRoutinePoints(user_UN, date);
        if (points > 0) {
            var reward = rewardService.getRewardByUserId(user_UN);
            int currentPoints = reward.getPoints();
            rewardService.updateRewardPoints(user_UN, currentPoints + points);
        }
    }

    /**
     * 목표 포인트 지급
     */
    public void awardGoalPoints(Integer goal_id, Integer user_UN, LocalDate date) {
        int points = calculateGoalPoints(goal_id, date);
        if (points > 0) {
            var reward = rewardService.getRewardByUserId(user_UN);
            int currentPoints = reward.getPoints();
            rewardService.updateRewardPoints(user_UN, currentPoints + points);
        }
    }

    /**
     * 다이어리 포인트 지급
     */
    public void awardDiaryPoints(Integer user_UN, LocalDate date) {
        int points = calculateDiaryPoints();
        var reward = rewardService.getRewardByUserId(user_UN);
        int currentPoints = reward.getPoints();
        rewardService.updateRewardPoints(user_UN, currentPoints + points);

        // 주간 연속 작성 보너스 체크
        if (checkWeeklyDiaryBonus(user_UN, date)) {
            rewardService.updateRewardPoints(user_UN, currentPoints + points + 50);
        }
    }
}

