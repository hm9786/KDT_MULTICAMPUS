package com.example.test23.service;

import com.example.test23.entity.Routine;
import com.example.test23.entity.RoutineLog;
import com.example.test23.mappers.RoutineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RoutineService {

    @Autowired
    private RoutineMapper routineMapper;

    public List<Routine> getRoutinesByUserId(Integer user_UN) {
        return routineMapper.getRoutinesByUserId(user_UN);
    }

    public Routine getRoutineById(Integer routine_id) {
        return routineMapper.getRoutineById(routine_id);
    }

    public Routine createRoutine(Routine routine) {
        routineMapper.insertRoutine(routine);
        return routine;
    }

    public void updateRoutine(Routine routine) {
        routineMapper.updateRoutine(routine);
    }

    public void deleteRoutine(Integer routine_id) {
        routineMapper.deleteRoutine(routine_id);
    }

    public List<RoutineLog> getRoutineLogsByDate(Integer user_UN, LocalDate log_date) {
        return routineMapper.getRoutineLogsByDate(user_UN, log_date);
    }

    public RoutineLog getRoutineLog(Integer routine_id, LocalDate log_date) {
        return routineMapper.getRoutineLog(routine_id, log_date);
    }

    public void saveRoutineLog(RoutineLog log) {
        RoutineLog existing = routineMapper.getRoutineLog(log.getRoutine_id(), log.getLog_date());
        if (existing != null) {
            log.setLog_id(existing.getLog_id());
            routineMapper.updateRoutineLog(log);
        } else {
            routineMapper.insertRoutineLog(log);
        }
    }
}

