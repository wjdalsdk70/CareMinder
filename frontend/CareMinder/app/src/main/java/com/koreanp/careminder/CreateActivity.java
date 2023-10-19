package com.koreanp.careminder;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.os.Handler;
import android.widget.TextView;
import android.widget.Toast;


import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONException;

import com.koreanp.careminder.dal.PatientDao;
import com.koreanp.careminder.model.Patient;

public class CreateActivity extends AppCompatActivity {
    private EditText nameEditText;
    private EditText descriptionEditText;
    private Button submitButton;

    private PatientDao patientDao;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_create);

        nameEditText = findViewById(R.id.nameEditText);
        descriptionEditText = findViewById(R.id.descriptionEditText);
        submitButton = findViewById(R.id.submitButton);

        patientDao = new PatientDao(this);

        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String name = nameEditText.getText().toString();
                String description = descriptionEditText.getText().toString();
                try {
                    createPatient(name, description);
                } catch (JSONException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }

    private void createPatient(String name, String description) throws JSONException {
        patientDao.postPatient(new Patient(name, description), new PatientDao.PatientCallBack() {
            @Override
            public void onSuccess(Patient patient) {
                showToast("Patient created");

                // Use a Handler to post a delayed action
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        // Navigate back to the main activity
                        finish(); // Finish the current activity to return to the main activity
                    }
                }, 1000); // Delay in milliseconds (1 second)
            }

            @Override
            public void onError(Exception e) {
                e.printStackTrace();
            }
        });
    }

    // Helper method to show a toast message
    private void showToast(String message) {
        LayoutInflater inflater = getLayoutInflater();
        View layout = inflater.inflate(R.layout.custom_toast, findViewById(R.id.custom_toast_layout));

        TextView text = layout.findViewById(R.id.toast_message);
        text.setText(message);

        Toast toast = new Toast(this);
        toast.setDuration(Toast.LENGTH_SHORT);
        toast.setView(layout);
        toast.show();
    }




}
