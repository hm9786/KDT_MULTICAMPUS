package com.example.test23.mappers;

import com.example.test23.entity.Goal;
import com.example.test23.entity.GoalTask;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface GoalMapper {
    List<Goal> getGoalsByUserId(@Param("user_UN") Integer user_UN);
    Goal getGoalById(@Param("goal_id") Integer goal_id);
    void insertGoal(Goal goal);
    void updateGoal(Goal goal);
    void deleteGoal(@Param("goal_id") Integer goal_id);
    
    // Goal Tasks
    List<GoalTask> getTasksByGoalId(@Param("goal_id") Integer goal_id);
    List<GoalTask> getTasksByDate(@Param("goal_id") Integer goal_id, @Param("task_date") LocalDate task_date);
    GoalTask getTaskById(@Param("task_id") Integer task_id);
    void insertTask(GoalTask task);
    void updateTask(GoalTask task);
    void deleteTask(@Param("task_id") Integer task_id);
    Integer getTotalTimeByGoalAndMonth(@Param("goal_id") Integer goal_id, @Param("month") String month);
}

