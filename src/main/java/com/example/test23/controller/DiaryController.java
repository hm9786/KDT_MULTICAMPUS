package com.example.test23.controller;

import com.example.test23.entity.Diary;
import com.example.test23.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/diaries")
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Diary>> getDiariesByUserId(@PathVariable Integer userId) {
        try {
            List<Diary> diaries = diaryService.getDiariesByUserId(userId);
            return ResponseEntity.ok(diaries);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/user/{userId}/date")
    public ResponseEntity<Diary> getDiaryByDate(
            @PathVariable Integer userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate diary_date) {
        try {
            Diary diary = diaryService.getDiaryByDate(userId, diary_date);
            if (diary == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(diary);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{diaryId}")
    public ResponseEntity<Diary> getDiaryById(@PathVariable Integer diaryId) {
        try {
            Diary diary = diaryService.getDiaryById(diaryId);
            if (diary == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(diary);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Diary> createOrUpdateDiary(@RequestBody Diary diary) {
        try {
            Diary saved = diaryService.createOrUpdateDiary(diary);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{diaryId}")
    public ResponseEntity<?> updateDiary(@PathVariable Integer diaryId, @RequestBody Diary diary) {
        try {
            diary.setDiary_id(diaryId);
            diaryService.createOrUpdateDiary(diary);
            return ResponseEntity.ok("다이어리가 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("다이어리 업데이트 중 오류가 발생하였습니다.");
        }
    }

    @DeleteMapping("/{diaryId}")
    public ResponseEntity<?> deleteDiary(@PathVariable Integer diaryId) {
        try {
            diaryService.deleteDiary(diaryId);
            return ResponseEntity.ok("다이어리가 삭제되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("다이어리 삭제 중 오류가 발생하였습니다.");
        }
    }

    @GetMapping("/user/{userId}/average-rating")
    public ResponseEntity<Map<String, Double>> getAverageRatingByWeek(
            @PathVariable Integer userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        try {
            Double average = diaryService.getAverageRatingByWeek(userId, startDate, endDate);
            return ResponseEntity.ok(Map.of("averageRating", average));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

