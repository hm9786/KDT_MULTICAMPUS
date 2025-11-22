package com.example.test23.entity;

import java.time.LocalDate;

public class GoalTask {
    private Integer task_id;
    private Integer goal_id;
    private String task_name;
    private LocalDate task_date;
    private Boolean completed;
    private Integer total_time; // 누적 시간 (분)

    // Getters and Setters
    public Integer getTask_id() {
        return task_id;
    }

    public void setTask_id(Integer task_id) {
        this.task_id = task_id;
    }

    public Integer getGoal_id() {
        return goal_id;
    }

    public void setGoal_id(Integer goal_id) {
        this.goal_id = goal_id;
    }

    public String getTask_name() {
        return task_name;
    }

    public void setTask_name(String task_name) {
        this.task_name = task_name;
    }

    public LocalDate getTask_date() {
        return task_date;
    }

    public void setTask_date(LocalDate task_date) {
        this.task_date = task_date;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Integer getTotal_time() {
        return total_time;
    }

    public void setTotal_time(Integer total_time) {
        this.total_time = total_time;
    }
}

