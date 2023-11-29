package com.example.careminder.dal;

import android.content.Context;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.careminder.helper.RequestJsonParser;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class RequestDao {

    private static final String BASE_REQUEST_URL = "http://10.0.2.2:8000/api/requests";

    private final RequestQueue requestQueue;

    public RequestDao(Context context) {
        requestQueue = Volley.newRequestQueue(context);
    }

//    public void postRequest(final com.example.careminder.model.Request request, final RequestCallBack callback) throws JSONException {
//        Map<String, Object> params = new HashMap<>();
//
//        // Assuming that request.getId(), request.getForRole(), request.getForRoleId(),
//        // request.getState(), and request.getTabletId() methods exist in your Request class
//        params.put("id", request.getId());
//        params.put("text", request.getText());
//        params.put("forRole", request.getForRole());
//        params.put("forRoleId", request.getForRoleId());
//        params.put("isQuestion", request.isQuestion());
//        params.put("state", request.getState());
//        params.put("time", request.getTime().toString());
//        params.put("tabletId", request.getTabletId());
//
//        // Convert the Map to JSON
//        JSONObject jsonParams = new JSONObject(params);
//
//        // Create the JSON string
//        final String requestBody = jsonParams.toString();
//
//        StringRequest stringRequest = new StringRequest(Request.Method.POST, BASE_REQUEST_URL,
//                new Response.Listener<String>() {
//                    @Override
//                    public void onResponse(String response) {
//                        try {
//                            com.example.careminder.model.Request parsedRequest = RequestJsonParser.parsePostRequest(response);
//                            callback.onSuccess(parsedRequest);
//                        } catch (Exception e) {
//                            callback.onError(e);
//                        }
//                    }
//                }, new Response.ErrorListener() {
//            @Override
//            public void onErrorResponse(VolleyError error) {
//                callback.onError(error);
//            }
//        }) {
//
//            @Override
//            public Map<String, String> getHeaders() {
//                Map<String, String> headers = new HashMap<>();
//                headers.put("Content-Type", "application/json");
//                return headers;
//            }
//
//            @Override
//            public byte[] getBody() {
//                try {
//                    return requestBody.getBytes("utf-8");
//                } catch (UnsupportedEncodingException e) {
//                    e.printStackTrace();
//                    return null;
//                }
//            }
//        };
//
//        requestQueue.add(stringRequest);
//    }


    public interface RequestCallBack {
        void onSuccess(com.example.careminder.model.Request request);

        void onError(Exception e);
    }

}
