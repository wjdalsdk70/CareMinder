package com.example.careminder.model;

public class Patient {

    public String name;
    public String description;

    public Integer id;

    public Patient(String name, String description, int id) {
        this.name = name;
        this.description = description;
        this.id = id;
    }

    public Patient(String name, String description) {
        this.name = name;
        this.description = description;
    }
    public Patient(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", id=" + id +
                '}';
    }
}
