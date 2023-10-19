package com.example.careminder;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

import com.example.careminder.activity.PatientActivity;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void OnStartButtonClick(View view) {
        Intent intent = new Intent(this, PatientActivity.class);
        startActivity(intent);
    }
}