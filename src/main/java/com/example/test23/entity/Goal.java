package com.example.test23.entity;

import java.time.LocalDate;

public class Goal {
    private Integer goal_id;
    private Integer user_UN;
    private String title;
    private String description;
    private LocalDate target_date;
    private String color;

    // Getters and Setters
    public Integer getGoal_id() {
        return goal_id;
    }

    public void setGoal_id(Integer goal_id) {
        this.goal_id = goal_id;
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

    public LocalDate getTarget_date() {
        return target_date;
    }

    public void setTarget_date(LocalDate target_date) {
        this.target_date = target_date;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}

