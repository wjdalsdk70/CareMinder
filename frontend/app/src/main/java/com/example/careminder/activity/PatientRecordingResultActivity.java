package com.example.careminder.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.example.careminder.R;

public class PatientRecordingResultActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_patient_recording_result);
    }

    public void OnBackButtonClick(View view) {
        Intent intent = new Intent(this, PatientRecordingActivity.class);
        startActivity(intent);
        finish();
    }

    public void OnCancelClick(View view) {
        Intent intent = new Intent(this, PatientRecordingActivity.class);
        startActivity(intent);
        finish();
    }


    public void OnSendTextClick(View view) {
        Intent intent = new Intent(this, PatientActivity.class);
        startActivity(intent);
        finish();
    }

    public void OnSendMoreClick(View view) {
        Intent intent = new Intent(this, PatientRecordingActivity.class);
        startActivity(intent);
        finish();
    }
}