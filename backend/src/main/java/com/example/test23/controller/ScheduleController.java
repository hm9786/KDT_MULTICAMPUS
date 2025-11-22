package com.example.test23.controller;

import com.example.test23.entity.Schedule;
import com.example.test23.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Schedule>> getSchedulesByUserId(@PathVariable Integer userId) {
        try {
            List<Schedule> schedules = scheduleService.getSchedulesByUserId(userId);
            return ResponseEntity.ok(schedules);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{userId}/range")
    public ResponseEntity<List<Schedule>> getSchedulesByDateRange(
            @PathVariable Integer userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
            List<Schedule> schedules = scheduleService.getSchedulesByDateRange(userId, startDate, endDate);
            return ResponseEntity.ok(schedules);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{scheduleId}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable Integer scheduleId) {
        try {
            Schedule schedule = scheduleService.getScheduleById(scheduleId);
            if (schedule == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(schedule);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Schedule> createSchedule(@RequestBody Schedule schedule) {
        try {
            Schedule created = scheduleService.createSchedule(schedule);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{scheduleId}")
    public ResponseEntity<?> updateSchedule(@PathVariable Integer scheduleId, @RequestBody Schedule schedule) {
        try {
            schedule.setSchedule_id(scheduleId);
            scheduleService.updateSchedule(schedule);
            return ResponseEntity.ok("일정이 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("일정 업데이트 중 오류가 발생하였습니다.");
        }
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Integer scheduleId) {
        try {
            scheduleService.deleteSchedule(scheduleId);
            return ResponseEntity.ok("일정이 삭제되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("일정 삭제 중 오류가 발생하였습니다.");
        }
    }
}

