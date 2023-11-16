package com.example.careminder.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;
import com.example.careminder.R;
import com.example.careminder.dal.PatientDao;
import com.example.careminder.model.Patient;
import com.example.careminder.model.Request;
import com.example.careminder.touch.OnSwipeTouchListener;

import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

public class PatientActivity extends AppCompatActivity {

    private PatientDao patientDao;
    private FrameLayout popupContainer;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_patient);

        patientDao = new PatientDao(this);

//        popupContainer = findViewById(R.id.popupContainer);

        // Set request amounts //
        TextView amount_of_requests = findViewById(R.id.amount_of_requests);
        amount_of_requests.setText("42");

        TextView amount_waiting = findViewById(R.id.waiting_amount);
        amount_waiting.setText("3");
        TextView progress_amount = findViewById(R.id.progress_amount);
        progress_amount.setText("5");
        TextView complete_amount = findViewById(R.id.complete_amount);
        complete_amount.setText("2");


        // Set request amounts //

        // params //
        int margin = 16;
        int padding = 20;
        int width = 320;
        int height = 100;

        // top items title //
        LinearLayout title_row = findViewById(R.id.horizontal_scroll_description_title);
        String[] titles = {
                "Name",
                "Doctor",
                "Nurse",
                "1st Visit",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Hospitalization"
        };
        for (int i = 0; i < titles.length; i++) {
            String item = titles[i];

            TextView textView = new TextView(PatientActivity.this);
            textView.setText(item);
            textView.setLayoutParams(new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT));

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(width, height);
            params.setMargins(margin, 0, margin, 0);
            textView.setLayoutParams(params);
            textView.setBackgroundResource(R.drawable.rounded_box_light);

            textView.setPadding(padding, padding, padding, padding);
            textView.setGravity(Gravity.CENTER);

            title_row.addView(textView);
        }

        // bottom items text //

        LinearLayout text_row = findViewById(R.id.horizontal_scroll_description_text);
        String[] text = {
                "Name",
                "Doctor",
                "Nurse",
                "1st Visit",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Examinations",
                "Hospitalization"
        };
        for (int i = 0; i < text.length; i++) {
            String item = text[i];

            TextView textView = new TextView(PatientActivity.this);
            textView.setText(item);
            textView.setLayoutParams(new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT));

            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(width, height);

            params.setMargins(margin, 0, margin, 0);
            textView.setLayoutParams(params);
            textView.setBackgroundResource(R.drawable.rounded_box_light);

            textView.setPadding(padding, padding, padding, padding);
            textView.setGravity(Gravity.CENTER);

            text_row.addView(textView);
        }

    }



//        getPatients();

//        LinearLayout linearLayout = findViewById(R.id.patient_detail);
//        int numViews = 7;
//        String[] textArray = {
//                "Name",
//                "Doctor",
//                "Nurse",
//                "1st Visit",
//                "Examinations",
//                "Examinations",
//                "Hospitalization"
//        };
//
//        String[] secondRowTextArray = {
//                "Second row text 1",
//                "Second row text 2",
//                "Second row text 3",
//                "Second row text 4",
//                "Second row text 5",
//                "Second row text 6",
//                "Second row text 7"
//        };
//
//        for (int i = 0; i < numViews; i++) {
//            LinearLayout rowLayout = new LinearLayout(this);
//            rowLayout.setOrientation(LinearLayout.VERTICAL);
//
//            TextView textView1 = new TextView(this);
//            LinearLayout.LayoutParams layoutParams1 = new LinearLayout.LayoutParams(
//                    dpToPx(155), dpToPx(46)
//            );
//
//            layoutParams1.setMargins(dpToPx(10), dpToPx(5), dpToPx(10), dpToPx(5));
//            textView1.setLayoutParams(layoutParams1);
//
//            if (i == 0 || i == numViews - 1) {
//                textView1.setBackgroundResource(R.drawable.rounded_box_dark);
//            } else {
//                textView1.setBackgroundResource(R.drawable.rounded_box_light);
//            }
//
//            String text1 = textArray[i];
//            textView1.setText(text1);
//            textView1.setGravity(Gravity.CENTER);
//            textView1.setSingleLine(false);
//            textView1.setTextSize(20);
//
//            TextView textView2 = new TextView(this);
//            LinearLayout.LayoutParams layoutParams2 = new LinearLayout.LayoutParams(
//                    LinearLayout.LayoutParams.MATCH_PARENT, dpToPx(46)
//            );
//
//            layoutParams2.setMargins(dpToPx(10), dpToPx(5), dpToPx(10), dpToPx(5));
//            textView2.setLayoutParams(layoutParams2);
//
//            textView2.setBackgroundResource(R.drawable.rounded_box_response);
//
//            String text2 = secondRowTextArray[i];
//            textView2.setText(text2);
//            textView2.setGravity(Gravity.CENTER);
//            textView2.setSingleLine(false);
//            textView2.setTextSize(20);
//
//            rowLayout.addView(textView1);
//            rowLayout.addView(textView2);
//
//            linearLayout.addView(rowLayout);

//        linearLayout.setOnTouchListener(new OnSwipeTouchListener(this) {
//        @Override
//        public void onSwipeLeft() {
//            popupContainer.setVisibility(View.VISIBLE);
//            popupContainer.animate().translationX(0f);
//        }
//
//        @Override
//        public void onSwipeRight() {
//            popupContainer.animate()
//                    .translationX(popupContainer.getWidth())
//                    .withEndAction(new Runnable() {
//                        @Override
//                        public void run() {
//                            popupContainer.setVisibility(View.GONE);
//                            popupContainer.setTranslationX(0f);
//                        }
//                    });
//        }
//    });


    public void OnRequestButtonClick(View view) {
        Intent intent = new Intent(this, PatientRecordingActivity.class);
        startActivity(intent);
    }

    public void OnQuestionButtonClick(View view) {
        Intent intent = new Intent(this, PatientRecordingActivity.class);
        startActivity(intent);
    }

    private void getPatients() {
        patientDao.getPatientById(new PatientDao.PatientCallBack(){
            @Override
            public void onSuccess(Patient patient){
                Log.d("Patient", patient.toString());
            }

            @Override
            public void onError(Exception e) {
                e.printStackTrace();
            }
        });
    };
}
