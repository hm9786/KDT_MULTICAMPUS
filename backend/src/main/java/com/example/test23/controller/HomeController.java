package com.example.test23.controller;

import com.example.test23.entity.Schedule;
import com.example.test23.entity.Routine;
import com.example.test23.entity.Goal;
import com.example.test23.entity.Diary;
import com.example.test23.entity.Reward;
import com.example.test23.service.ScheduleService;
import com.example.test23.service.RoutineService;
import com.example.test23.service.GoalService;
import com.example.test23.service.DiaryService;
import com.example.test23.service.RewardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private RoutineService routineService;

    @Autowired
    private GoalService goalService;

    @Autowired
    private DiaryService diaryService;

    @Autowired
    private RewardService rewardService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getHomeData(@RequestParam Integer userId) {
        try {
            // 일정 데이터 가져오기
            List<Schedule> schedules = scheduleService.getSchedulesByUserId(userId);
            
            // 루틴 데이터 가져오기
            List<Routine> routines = routineService.getRoutinesByUserId(userId);
            
            // 목표 데이터 가져오기
            List<Goal> goals = goalService.getGoalsByUserId(userId);
            
            // 다이어리 데이터 가져오기
            List<Diary> diaries = diaryService.getDiariesByUserId(userId);
            
            // 포인트 가져오기
            Reward reward = rewardService.getRewardByUserId(userId);
            Integer points = reward != null ? reward.getPoints() : 0;
            
            // 일정을 모드별로 분류
            List<Map<String, Object>> routineEvents = new ArrayList<>();
            List<Map<String, Object>> goalEvents = new ArrayList<>();
            List<Map<String, Object>> diaryEvents = new ArrayList<>();
            
            for (Schedule schedule : schedules) {
                Map<String, Object> event = new HashMap<>();
                event.put("id", schedule.getSchedule_id());
                event.put("title", schedule.getTitle());
                event.put("start", schedule.getStart_date().toString());
                if (schedule.getEnd_date() != null) {
                    event.put("end", schedule.getEnd_date().toString());
                }
                event.put("color", schedule.getColor());
                event.put("mode", schedule.getMode());
                
                if ("routine".equals(schedule.getMode())) {
                    routineEvents.add(event);
                } else if ("goal".equals(schedule.getMode())) {
                    goalEvents.add(event);
                } else if ("diary".equals(schedule.getMode())) {
                    diaryEvents.add(event);
                }
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("routineEvents", routineEvents);
            response.put("goalEvents", goalEvents);
            response.put("diaryEvents", diaryEvents);
            response.put("points", points);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

