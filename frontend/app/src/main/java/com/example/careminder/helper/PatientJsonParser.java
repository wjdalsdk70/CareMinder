package com.example.careminder.helper;

import com.example.careminder.model.Patient;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class PatientJsonParser {
    public static Patient parsePatient(String json) throws JSONException {
        JSONObject jsonObject = new JSONObject(json);
        String name = jsonObject.getString("name");
        String description = jsonObject.getString("description");
        Integer id = jsonObject.getInt("id");

        return new Patient(name, description, id);
    }

    public static List<Patient> parsePatients(String json) throws JSONException {
        List<Patient> patients = new ArrayList<>();
        JSONArray jsonArray = new JSONArray(json);

        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            String name = jsonObject.getString("name");
            String description = jsonObject.getString("description");
            Integer id = jsonObject.getInt("id");
            patients.add(new Patient(name, description, id));
        }

        return patients;
    }

    public static Patient parseInsertedPatientId(String json) throws JSONException {
        JSONObject responseJsonObject = new JSONObject(json);
        JSONObject patientResponseJsonObject = responseJsonObject.getJSONObject("patient");
        int insertedId = patientResponseJsonObject.getInt("insertedId");
        return new Patient(insertedId);
    }
}
