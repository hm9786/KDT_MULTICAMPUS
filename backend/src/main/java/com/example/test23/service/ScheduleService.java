package com.example.test23.service;

import com.example.test23.entity.Schedule;
import com.example.test23.mappers.ScheduleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleMapper scheduleMapper;

    public List<Schedule> getSchedulesByUserId(Integer user_UN) {
        return scheduleMapper.getSchedulesByUserId(user_UN);
    }

    public List<Schedule> getSchedulesByDateRange(Integer user_UN, LocalDate startDate, LocalDate endDate) {
        return scheduleMapper.getSchedulesByDateRange(user_UN, startDate, endDate);
    }

    public Schedule getScheduleById(Integer schedule_id) {
        return scheduleMapper.getScheduleById(schedule_id);
    }

    public Schedule createSchedule(Schedule schedule) {
        scheduleMapper.insertSchedule(schedule);
        return schedule;
    }

    public void updateSchedule(Schedule schedule) {
        scheduleMapper.updateSchedule(schedule);
    }

    public void deleteSchedule(Integer schedule_id) {
        scheduleMapper.deleteSchedule(schedule_id);
    }
}

