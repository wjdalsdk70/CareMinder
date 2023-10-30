package com.example.careminder.helper;

import com.example.careminder.model.Patient;
import com.example.careminder.model.Request;

import org.json.JSONException;
import org.json.JSONObject;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class RequestJsonParser {

    public static Request parseRequest(String json) throws JSONException {
        JSONObject jsonObject = new JSONObject(json);
        String text = jsonObject.getString("text");
        Integer state = jsonObject.getInt("state");
        String timeString = jsonObject.getString("time");
        DateTimeFormatter formatter = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            formatter = DateTimeFormatter.ISO_DATE_TIME;
        }
        LocalDateTime time = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            time = LocalDateTime.parse(timeString, formatter);
        }

        return new Request(text, state, time);
    }
}

