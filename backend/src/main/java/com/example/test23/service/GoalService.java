package com.example.test23.service;

import com.example.test23.entity.Goal;
import com.example.test23.entity.GoalTask;
import com.example.test23.mappers.GoalMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class GoalService {

    @Autowired
    private GoalMapper goalMapper;

    public List<Goal> getGoalsByUserId(Integer user_UN) {
        return goalMapper.getGoalsByUserId(user_UN);
    }

    public Goal getGoalById(Integer goal_id) {
        return goalMapper.getGoalById(goal_id);
    }

    public Goal createGoal(Goal goal) {
        goalMapper.insertGoal(goal);
        return goal;
    }

    public void updateGoal(Goal goal) {
        goalMapper.updateGoal(goal);
    }

    public void deleteGoal(Integer goal_id) {
        goalMapper.deleteGoal(goal_id);
    }

    public List<GoalTask> getTasksByGoalId(Integer goal_id) {
        return goalMapper.getTasksByGoalId(goal_id);
    }

    public List<GoalTask> getTasksByDate(Integer goal_id, LocalDate task_date) {
        return goalMapper.getTasksByDate(goal_id, task_date);
    }

    public GoalTask getTaskById(Integer task_id) {
        return goalMapper.getTaskById(task_id);
    }

    public GoalTask createTask(GoalTask task) {
        goalMapper.insertTask(task);
        return task;
    }

    public void updateTask(GoalTask task) {
        goalMapper.updateTask(task);
    }

    public void deleteTask(Integer task_id) {
        goalMapper.deleteTask(task_id);
    }

    public Integer getTotalTimeByGoalAndMonth(Integer goal_id, String month) {
        return goalMapper.getTotalTimeByGoalAndMonth(goal_id, month);
    }
}

