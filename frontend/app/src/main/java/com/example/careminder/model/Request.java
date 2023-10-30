package com.example.careminder.model;

import java.sql.Blob;
import java.sql.Time;
import java.time.LocalDateTime;

public class Request {
    private int id;
    private String text;
    private Blob recording;
    private Integer forRole;
    private Integer forRoleId;
    private boolean isQuestion;
    private Integer state;
    private LocalDateTime time;
    private String response;
    private LocalDateTime responseTime;
    private int tabletId;

    public Request(String text, Integer state, LocalDateTime responseTime) {
        this.text = text;
        this.state = state;
        this.responseTime = responseTime;
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

    public Blob getRecording() {
        return recording;
    }

    public void setRecording(Blob recording) {
        this.recording = recording;
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

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public LocalDateTime getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(LocalDateTime responseTime) {
        this.responseTime = responseTime;
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
                ", recording=" + recording +
                ", forRole=" + forRole +
                ", forRoleId=" + forRoleId +
                ", isQuestion=" + isQuestion +
                ", state=" + state +
                ", time=" + time +
                ", response='" + response + '\'' +
                ", responseTime=" + responseTime +
                ", tabletId=" + tabletId +
                '}';
    }
}

