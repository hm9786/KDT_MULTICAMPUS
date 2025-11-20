package com.example.test23.controller;

import com.example.test23.entity.Goal;
import com.example.test23.entity.GoalTask;
import com.example.test23.service.GoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/goals")
public class GoalController {

    @Autowired
    private GoalService goalService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Goal>> getGoalsByUserId(@PathVariable Integer userId) {
        try {
            List<Goal> goals = goalService.getGoalsByUserId(userId);
            return ResponseEntity.ok(goals);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{goalId}")
    public ResponseEntity<Goal> getGoalById(@PathVariable Integer goalId) {
        try {
            Goal goal = goalService.getGoalById(goalId);
            if (goal == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(goal);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal) {
        try {
            Goal created = goalService.createGoal(goal);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{goalId}")
    public ResponseEntity<?> updateGoal(@PathVariable Integer goalId, @RequestBody Goal goal) {
        try {
            goal.setGoal_id(goalId);
            goalService.updateGoal(goal);
            return ResponseEntity.ok("목표가 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("목표 업데이트 중 오류가 발생하였습니다.");
        }
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<?> deleteGoal(@PathVariable Integer goalId) {
        try {
            goalService.deleteGoal(goalId);
            return ResponseEntity.ok("목표가 삭제되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("목표 삭제 중 오류가 발생하였습니다.");
        }
    }

    @GetMapping("/{goalId}/tasks")
    public ResponseEntity<List<GoalTask>> getTasksByGoalId(@PathVariable Integer goalId) {
        try {
            List<GoalTask> tasks = goalService.getTasksByGoalId(goalId);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{goalId}/tasks/date")
    public ResponseEntity<List<GoalTask>> getTasksByDate(
            @PathVariable Integer goalId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate task_date) {
        try {
            List<GoalTask> tasks = goalService.getTasksByDate(goalId, task_date);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/{goalId}/tasks")
    public ResponseEntity<GoalTask> createTask(@PathVariable Integer goalId, @RequestBody GoalTask task) {
        try {
            task.setGoal_id(goalId);
            GoalTask created = goalService.createTask(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable Integer taskId, @RequestBody Map<String, Object> request) {
        try {
            GoalTask task = goalService.getTaskById(taskId);
            if (task == null) {
                return ResponseEntity.notFound().build();
            }
            
            if (request.containsKey("task_name")) {
                task.setTask_name((String) request.get("task_name"));
            }
            if (request.containsKey("completed")) {
                task.setCompleted((Boolean) request.get("completed"));
            }
            if (request.containsKey("total_time")) {
                Object totalTimeObj = request.get("total_time");
                if (totalTimeObj instanceof Number) {
                    task.setTotal_time(((Number) totalTimeObj).intValue());
                }
            }
            if (request.containsKey("task_date")) {
                task.setTask_date(java.time.LocalDate.parse((String) request.get("task_date")));
            }
            
            goalService.updateTask(task);
            return ResponseEntity.ok("작업이 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("작업 업데이트 중 오류가 발생하였습니다.");
        }
    }

    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Integer taskId) {
        try {
            goalService.deleteTask(taskId);
            return ResponseEntity.ok("작업이 삭제되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("작업 삭제 중 오류가 발생하였습니다.");
        }
    }

    @GetMapping("/{goalId}/total-time")
    public ResponseEntity<Map<String, Integer>> getTotalTimeByMonth(
            @PathVariable Integer goalId,
            @RequestParam String month) {
        try {
            Integer totalTime = goalService.getTotalTimeByGoalAndMonth(goalId, month);
            return ResponseEntity.ok(Map.of("totalTime", totalTime));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

