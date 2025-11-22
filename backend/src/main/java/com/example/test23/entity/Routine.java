package com.example.test23.entity;

import java.time.LocalTime;

public class Routine {
    private Integer routine_id;
    private Integer user_UN;
    private String title;
    private String description;
    private LocalTime time;
    private String repeat_days; // 월,화,수,목,금,토,일
    private String repeat_type; // daily, weekly, custom
    private String routine_type; // water, exercise, sleep, custom
    private Integer target_value;
    private Integer current_value;
    private Boolean is_active;

    // Getters and Setters
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getRepeat_days() {
        return repeat_days;
    }

    public void setRepeat_days(String repeat_days) {
        this.repeat_days = repeat_days;
    }

    public String getRepeat_type() {
        return repeat_type;
    }

    public void setRepeat_type(String repeat_type) {
        this.repeat_type = repeat_type;
    }

    public String getRoutine_type() {
        return routine_type;
    }

    public void setRoutine_type(String routine_type) {
        this.routine_type = routine_type;
    }

    public Integer getTarget_value() {
        return target_value;
    }

    public void setTarget_value(Integer target_value) {
        this.target_value = target_value;
    }

    public Integer getCurrent_value() {
        return current_value;
    }

    public void setCurrent_value(Integer current_value) {
        this.current_value = current_value;
    }

    public Boolean getIs_active() {
        return is_active;
    }

    public void setIs_active(Boolean is_active) {
        this.is_active = is_active;
    }
}

