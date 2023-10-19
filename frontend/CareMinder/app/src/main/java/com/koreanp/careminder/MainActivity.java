package com.koreanp.careminder;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.koreanp.careminder.dal.PatientDao;
import com.koreanp.careminder.model.Patient;

import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private RecyclerView patientRecyclerView;
    private PatientAdapter patientAdapter;
    private List<Patient> patients = new ArrayList<>();
    private PatientDao patientDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        patientDao = new PatientDao(this);

        patientRecyclerView = findViewById(R.id.patientRecyclerView);
        patientAdapter = new PatientAdapter(patients);
        patientRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        patientRecyclerView.setAdapter(patientAdapter);

        Button switchToCreateView = findViewById(R.id.goToCreateButton);
        switchToCreateView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                switchToCreateACtivity();
            }
        });

        Button fetchPatientsButton = findViewById(R.id.fetchPatientsButton);
        fetchPatientsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Call your method to fetch patients here
                getPatients();
            }
        });
    }

    public void switchToCreateACtivity() {
        Intent intent = new Intent(this, CreateActivity.class);
        startActivity(intent);
    }

    private void getPatients() {

        patientDao.getPatients(new PatientDao.PatientsCallBack() {
            @Override
            public void onSuccess(List<Patient> fetchedPatients) {
                patients.clear();
                patients.addAll(fetchedPatients);
                patientAdapter.notifyDataSetChanged();
            }

            @Override
            public void onError(Exception e) {
                e.printStackTrace();
            }
        });
    }

    private static class PatientAdapter extends RecyclerView.Adapter<PatientAdapter.PatientViewHolder> {

        private List<Patient> patients;

        public PatientAdapter(List<Patient> patients) {
            this.patients = patients;
        }

        @Override
        public PatientViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View itemView = LayoutInflater.from(parent.getContext())
                    .inflate(R.layout.list_item_patient, parent, false);
            return new PatientViewHolder(itemView);
        }

        @Override
        public void onBindViewHolder(PatientViewHolder holder, int position) {
            Patient patient = patients.get(position);
            holder.patientNameTextView.setText(patient.getName());
            holder.patientDescriptionTextView.setText(patient.getDescription());
        }

        @Override
        public int getItemCount() {
            return patients.size();
        }

        public static class PatientViewHolder extends RecyclerView.ViewHolder {
            TextView patientNameTextView;
            TextView patientDescriptionTextView;

            public PatientViewHolder(View itemView) {
                super(itemView);
                patientNameTextView = itemView.findViewById(R.id.patientNameTextView);
                patientDescriptionTextView = itemView.findViewById(R.id.patientDescriptionTextView);
            }
        }
    }
}