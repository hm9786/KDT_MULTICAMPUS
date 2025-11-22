package com.example.test23.controller;

import com.example.test23.entity.Routine;
import com.example.test23.entity.RoutineLog;
import com.example.test23.service.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/routines")
public class RoutineController {

    @Autowired
    private RoutineService routineService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Routine>> getRoutinesByUserId(@PathVariable Integer userId) {
        try {
            List<Routine> routines = routineService.getRoutinesByUserId(userId);
            return ResponseEntity.ok(routines);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{routineId}")
    public ResponseEntity<Routine> getRoutineById(@PathVariable Integer routineId) {
        try {
            Routine routine = routineService.getRoutineById(routineId);
            if (routine == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(routine);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Routine> createRoutine(@RequestBody Routine routine) {
        try {
            Routine created = routineService.createRoutine(routine);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{routineId}")
    public ResponseEntity<?> updateRoutine(@PathVariable Integer routineId, @RequestBody Routine routine) {
        try {
            routine.setRoutine_id(routineId);
            routineService.updateRoutine(routine);
            return ResponseEntity.ok("루틴이 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("루틴 업데이트 중 오류가 발생하였습니다.");
        }
    }

    @DeleteMapping("/{routineId}")
    public ResponseEntity<?> deleteRoutine(@PathVariable Integer routineId) {
        try {
            routineService.deleteRoutine(routineId);
            return ResponseEntity.ok("루틴이 삭제되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("루틴 삭제 중 오류가 발생하였습니다.");
        }
    }

    @GetMapping("/user/{userId}/logs")
    public ResponseEntity<List<RoutineLog>> getRoutineLogsByDate(
            @PathVariable Integer userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate log_date) {
        try {
            List<RoutineLog> logs = routineService.getRoutineLogsByDate(userId, log_date);
            return ResponseEntity.ok(logs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/logs")
    public ResponseEntity<?> saveRoutineLog(@RequestBody RoutineLog log) {
        try {
            routineService.saveRoutineLog(log);
            return ResponseEntity.ok("루틴 기록이 저장되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("루틴 기록 저장 중 오류가 발생하였습니다.");
        }
    }
}

