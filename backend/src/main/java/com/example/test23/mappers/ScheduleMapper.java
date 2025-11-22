package com.example.test23.mappers;

import com.example.test23.entity.Schedule;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface ScheduleMapper {
    List<Schedule> getSchedulesByUserId(@Param("user_UN") Integer user_UN);
    List<Schedule> getSchedulesByDateRange(@Param("user_UN") Integer user_UN, 
                                           @Param("startDate") LocalDate startDate, 
                                           @Param("endDate") LocalDate endDate);
    Schedule getScheduleById(@Param("schedule_id") Integer schedule_id);
    void insertSchedule(Schedule schedule);
    void updateSchedule(Schedule schedule);
    void deleteSchedule(@Param("schedule_id") Integer schedule_id);
}

