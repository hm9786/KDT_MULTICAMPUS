package com.example.test23.controller;

import com.example.test23.entity.RoutineLog;
import com.example.test23.mappers.RoutineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/routines/stats")
public class RoutineStatsController {

    @Autowired
    private RoutineMapper routineMapper;

    @GetMapping("/user/{userId}/weekly")
    public ResponseEntity<Map<String, Object>> getWeeklyStats(
            @PathVariable Integer userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {
        try {
            LocalDate endDate = startDate.plusDays(6);
            Map<String, Object> stats = new HashMap<>();
            
            int totalCompleted = 0;
            int totalDays = 0;
            
            for (int i = 0; i < 7; i++) {
                LocalDate date = startDate.plusDays(i);
                List<RoutineLog> logs = routineMapper.getRoutineLogsByDate(userId, date);
                if (!logs.isEmpty()) {
                    totalDays++;
                    long completedCount = logs.stream().filter(RoutineLog::getCompleted).count();
                    totalCompleted += completedCount;
                }
            }
            
            double completionRate = totalDays > 0 ? (double) totalCompleted / (totalDays * 7) * 100 : 0;
            
            stats.put("totalCompleted", totalCompleted);
            stats.put("totalDays", totalDays);
            stats.put("completionRate", Math.round(completionRate * 10) / 10.0);
            stats.put("startDate", startDate);
            stats.put("endDate", endDate);
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/user/{userId}/monthly")
    public ResponseEntity<Map<String, Object>> getMonthlyStats(
            @PathVariable Integer userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {
        try {
            LocalDate endDate = startDate.plusMonths(1).minusDays(1);
            Map<String, Object> stats = new HashMap<>();
            
            int totalCompleted = 0;
            int totalDays = 0;
            
            LocalDate current = startDate;
            while (!current.isAfter(endDate)) {
                List<RoutineLog> logs = routineMapper.getRoutineLogsByDate(userId, current);
                if (!logs.isEmpty()) {
                    totalDays++;
                    long completedCount = logs.stream().filter(RoutineLog::getCompleted).count();
                    totalCompleted += completedCount;
                }
                current = current.plusDays(1);
            }
            
            double completionRate = totalDays > 0 ? (double) totalCompleted / (totalDays * 7) * 100 : 0;
            
            stats.put("totalCompleted", totalCompleted);
            stats.put("totalDays", totalDays);
            stats.put("completionRate", Math.round(completionRate * 10) / 10.0);
            stats.put("startDate", startDate);
            stats.put("endDate", endDate);
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}

