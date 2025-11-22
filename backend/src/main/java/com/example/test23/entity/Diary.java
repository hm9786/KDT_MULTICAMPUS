package com.example.test23.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

public class Diary {
    private Integer diary_id;
    private Integer user_UN;
    private LocalDate diary_date;
    private String weather;
    private BigDecimal temperature;
    private String today_goal;
    private String content;
    private Integer star_rating; // 0-5점
    private String image_url;

    // Getters and Setters
    public Integer getDiary_id() {
        return diary_id;
    }

    public void setDiary_id(Integer diary_id) {
        this.diary_id = diary_id;
    }

    public Integer getUser_UN() {
        return user_UN;
    }

    public void setUser_UN(Integer user_UN) {
        this.user_UN = user_UN;
    }

    public LocalDate getDiary_date() {
        return diary_date;
    }

    public void setDiary_date(LocalDate diary_date) {
        this.diary_date = diary_date;
    }

    public String getWeather() {
        return weather;
    }

    public void setWeather(String weather) {
        this.weather = weather;
    }

    public BigDecimal getTemperature() {
        return temperature;
    }

    public void setTemperature(BigDecimal temperature) {
        this.temperature = temperature;
    }

    public String getToday_goal() {
        return today_goal;
    }

    public void setToday_goal(String today_goal) {
        this.today_goal = today_goal;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getStar_rating() {
        return star_rating;
    }

    public void setStar_rating(Integer star_rating) {
        this.star_rating = star_rating;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}

