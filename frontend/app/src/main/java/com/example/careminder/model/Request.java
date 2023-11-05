package com.example.careminder.model;

import java.sql.Blob;
import java.sql.Time;
import java.time.LocalDateTime;

public class Request {
    private int id;
    private String text;
    private Integer forRole;
    private Integer forRoleId;
    private boolean isQuestion;
    private Integer state;
    private LocalDateTime time;
    private int tabletId;

    public Request(String text, Integer state, LocalDateTime time) {
        this.text = text;
        this.state = state;
        this.time = time;
    }

    public Request(int id, String text, Integer forRole, Integer forRoleId, boolean isQuestion, Integer state, LocalDateTime time, int tabletId) {
        this.id = id;
        this.text = text;
        this.forRole = forRole;
        this.forRoleId = forRoleId;
        this.isQuestion = isQuestion;
        this.state = state;
        this.time = time;
        this.tabletId = tabletId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Integer getForRole() {
        return forRole;
    }

    public void setForRole(Integer forRole) {
        this.forRole = forRole;
    }

    public Integer getForRoleId() {
        return forRoleId;
    }

    public void setForRoleId(Integer forRoleId) {
        this.forRoleId = forRoleId;
    }

    public boolean isQuestion() {
        return isQuestion;
    }

    public void setQuestion(boolean question) {
        isQuestion = question;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public int getTabletId() {
        return tabletId;
    }

    public void setTabletId(int tabletId) {
        this.tabletId = tabletId;
    }

    @Override
    public String toString() {
        return "Request{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", forRole=" + forRole +
                ", forRoleId=" + forRoleId +
                ", isQuestion=" + isQuestion +
                ", state=" + state +
                ", time=" + time +
                ", tabletId=" + tabletId +
                '}';
    }
}

