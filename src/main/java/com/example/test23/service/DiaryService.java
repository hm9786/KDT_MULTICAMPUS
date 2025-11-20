package com.example.test23.service;

import com.example.test23.entity.Diary;
import com.example.test23.mappers.DiaryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DiaryService {

    @Autowired
    private DiaryMapper diaryMapper;

    public List<Diary> getDiariesByUserId(Integer user_UN) {
        return diaryMapper.getDiariesByUserId(user_UN);
    }

    public Diary getDiaryByDate(Integer user_UN, LocalDate diary_date) {
        return diaryMapper.getDiaryByDate(user_UN, diary_date);
    }

    public Diary getDiaryById(Integer diary_id) {
        return diaryMapper.getDiaryById(diary_id);
    }

    public Diary createOrUpdateDiary(Diary diary) {
        Diary existing = diaryMapper.getDiaryByDate(diary.getUser_UN(), diary.getDiary_date());
        if (existing != null) {
            diary.setDiary_id(existing.getDiary_id());
            diaryMapper.updateDiary(diary);
        } else {
            diaryMapper.insertDiary(diary);
        }
        return diary;
    }

    public void deleteDiary(Integer diary_id) {
        diaryMapper.deleteDiary(diary_id);
    }

    public Double getAverageRatingByWeek(Integer user_UN, LocalDate startDate, LocalDate endDate) {
        return diaryMapper.getAverageRatingByWeek(user_UN, startDate, endDate);
    }
}

