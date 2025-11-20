package com.example.test23.entity;

import java.time.LocalDate;

public class RoutineLog {
    private Integer log_id;
    private Integer routine_id;
    private Integer user_UN;
    private LocalDate log_date;
    private Boolean completed;
    private Integer value;

    // Getters and Setters
    public Integer getLog_id() {
        return log_id;
    }

    public void setLog_id(Integer log_id) {
        this.log_id = log_id;
    }

    public Integer getRoutine_id() {
        return routine_id;
    }

    public void setRoutine_id(Integer routine_id) {
        this.routine_id = routine_id;
    }

    public Integer getUser_UN() {
        return user_UN;
    }

    public void setUser_UN(Integer user_UN) {
        this.user_UN = user_UN;
    }

    public LocalDate getLog_date() {
        return log_date;
    }

    public void setLog_date(LocalDate log_date) {
        this.log_date = log_date;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }
}

