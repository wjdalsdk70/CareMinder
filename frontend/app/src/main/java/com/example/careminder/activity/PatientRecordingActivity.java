package com.example.careminder.activity;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import com.example.careminder.MainActivity;
import com.example.careminder.R;
import com.example.careminder.view.VisualizerView;

public class PatientRecordingActivity extends AppCompatActivity {
    private static final int SAMPLE_RATE = 8000;
    private AudioRecord audioRecord;
    private VisualizerView visualizerView;
    private int minBufferSize;

    private Handler handler = new Handler();
    private Runnable updateVisualizer = new Runnable() {
        @Override
        public void run() {
            if (audioRecord != null && audioRecord.getRecordingState() == AudioRecord.RECORDSTATE_RECORDING) {
                byte[] buffer = new byte[minBufferSize];
                audioRecord.read(buffer, 0, buffer.length);
                visualizerView.updateVisualizer(buffer);
                handler.postDelayed(this, 200);
            }
        }
    };

    public PatientRecordingActivity() {
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_patient_recording);

        visualizerView = findViewById(R.id.visualizer);

        minBufferSize = AudioRecord.getMinBufferSize(SAMPLE_RATE, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT);
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO}, 1);
            return;
        }
        audioRecord = new AudioRecord(MediaRecorder.AudioSource.MIC, SAMPLE_RATE, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT, minBufferSize);

        audioRecord.startRecording();
        handler.post(updateVisualizer);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (audioRecord != null) {
            audioRecord.stop();
            audioRecord.release();
            audioRecord = null;
        }
        handler.removeCallbacks(updateVisualizer);
    }

    public void OnBackButtonClick(View view) {
        Intent intent = new Intent(this, PatientActivity.class);
        startActivity(intent);
    }

    public void OnCancelClick(View view) {
    }
}

