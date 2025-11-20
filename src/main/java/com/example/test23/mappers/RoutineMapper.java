package com.example.test23.mappers;

import com.example.test23.entity.Routine;
import com.example.test23.entity.RoutineLog;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface RoutineMapper {
    List<Routine> getRoutinesByUserId(@Param("user_UN") Integer user_UN);
    Routine getRoutineById(@Param("routine_id") Integer routine_id);
    void insertRoutine(Routine routine);
    void updateRoutine(Routine routine);
    void deleteRoutine(@Param("routine_id") Integer routine_id);
    
    // Routine Log
    List<RoutineLog> getRoutineLogsByDate(@Param("user_UN") Integer user_UN, @Param("log_date") LocalDate log_date);
    RoutineLog getRoutineLog(@Param("routine_id") Integer routine_id, @Param("log_date") LocalDate log_date);
    void insertRoutineLog(RoutineLog log);
    void updateRoutineLog(RoutineLog log);
}

