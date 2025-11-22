package com.example.test23.mappers;

import com.example.test23.entity.Diary;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface DiaryMapper {
    List<Diary> getDiariesByUserId(@Param("user_UN") Integer user_UN);
    Diary getDiaryByDate(@Param("user_UN") Integer user_UN, @Param("diary_date") LocalDate diary_date);
    Diary getDiaryById(@Param("diary_id") Integer diary_id);
    void insertDiary(Diary diary);
    void updateDiary(Diary diary);
    void deleteDiary(@Param("diary_id") Integer diary_id);
    Double getAverageRatingByWeek(@Param("user_UN") Integer user_UN, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}

