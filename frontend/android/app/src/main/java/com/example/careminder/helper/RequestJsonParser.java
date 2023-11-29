package com.example.careminder.helper;

import com.example.careminder.model.Patient;
import com.example.careminder.model.Request;

import org.json.JSONException;
import org.json.JSONObject;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class RequestJsonParser {
    public static Request parsePostRequest(String json) throws JSONException {
        JSONObject jsonObject = new JSONObject(json);
        String text = jsonObject.getString("text");
        byte[] recording = jsonObject.get("recording").toString().getBytes();
        boolean isQuestion = jsonObject.getBoolean("isQuestion");
        Date time = Date.valueOf(jsonObject.getString("time"));
        Integer tablet = jsonObject.getInt("tablet");

        return new Request(text, recording, isQuestion, time, tablet);
    }

    public static Request parseGetRequest(String json) throws JSONException {
        JSONObject jsonObject = new JSONObject(json);
        String text = jsonObject.getString("text");
        boolean isQuestion = jsonObject.getBoolean("isQuestion");
        Request.State state = Request.State.valueOf(jsonObject.getString("state"));
        Date time = Date.valueOf(jsonObject.getString("time")); //
        String response = jsonObject.getString("response");
        Date responseTime = Date.valueOf(jsonObject.getString("responseTime"));
        Integer tablet = jsonObject.getInt("tablet");

        return new Request(text, isQuestion, state, time, response, responseTime, tablet);
    }

}

