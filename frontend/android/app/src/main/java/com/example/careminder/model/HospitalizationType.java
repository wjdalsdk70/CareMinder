package com.example.careminder.model;

public enum HospitalizationType {
    NOT_HOSPITALIZED("Not Hospitalized"),
    HOSPITALIZED("Hospitalized"),
    CRITICAL("Critical");

    private final String displayName;

    HospitalizationType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
