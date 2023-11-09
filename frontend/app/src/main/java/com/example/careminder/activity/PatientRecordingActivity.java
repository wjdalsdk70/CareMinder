package com.example.careminder.activity;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;
import android.os.Bundle;
import android.os.Handler;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import com.example.careminder.MainActivity;
import com.example.careminder.R;
import com.example.careminder.view.VisualizerView;
import java.util.ArrayList;

public class PatientRecordingActivity extends AppCompatActivity {
    private static final int SAMPLE_RATE = 8000;
    private AudioRecord audioRecord;
    private VisualizerView visualizerView;
    private int minBufferSize;
    private SpeechRecognizer speechRecognizer;
    private TextView textView;
    private Handler handler = new Handler();
//    RecognitionListener recognitionListener = new RecognitionListener() {
//        @Override
//        public void onReadyForSpeech(Bundle params) {
//
//        }
//
//        @Override
//        public void onBeginningOfSpeech() {
//
//        }
//
//        @Override
//        public void onRmsChanged(float rmsdB) {
//
//        }
//
//        @Override
//        public void onBufferReceived(byte[] buffer) {
//
//        }
//
//        @Override
//        public void onEndOfSpeech() {
//
//        }
//
//        @Override
//        public void onError(int error) {
//            Log.e("SpeechRecognition", "Error code: " + error);
//        }
//
//        @Override
//        public void onResults(Bundle results) {
//            ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
//            if (matches != null)
//                textView.setText(matches.get(0));
//        }
//
//        @Override
//        public void onPartialResults(Bundle partialResults) {
//            ArrayList<String> matches = partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
//            if (matches != null) {
//                textView.setText(matches.get(0));
//                Log.d("SpeechRecognition", "Result: " + matches.get(0));
//            }
//        }
//
//        @Override
//        public void onEvent(int eventType, Bundle params) {
//
//        }
//    };
//


//    private Runnable updateVisualizer = new Runnable() {
//        @Override
//        public void run() {
//            if (audioRecord != null && audioRecord.getRecordingState() == AudioRecord.RECORDSTATE_RECORDING) {
//                byte[] buffer = new byte[minBufferSize];
//                audioRecord.read(buffer, 0, buffer.length);
//                visualizerView.updateVisualizer(buffer);
//                handler.postDelayed(this, 200);
//            }
//        }
//    };

    public PatientRecordingActivity() {
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_patient_recording);

        handleAudio();
    }

    protected void handleAudio() {
//        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
//            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO}, 1);
//        }
//
//        // recognize
//        speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this);
//        textView = findViewById(R.id.recognized_text);
//        speechRecognizer.setRecognitionListener(recognitionListener);
//
//        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
//        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
//        speechRecognizer.startListening(intent);
//
//
//        // visualize
//        visualizerView = findViewById(R.id.visualizer);
//        minBufferSize = AudioRecord.getMinBufferSize(SAMPLE_RATE, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT);
//        audioRecord = new AudioRecord(MediaRecorder.AudioSource.MIC, SAMPLE_RATE, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT, minBufferSize);
//
//        audioRecord.startRecording();
//        handler.post(updateVisualizer);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
//        if (audioRecord != null) {
//            audioRecord.stop();
//            audioRecord.release();
//            audioRecord = null;
//        }
//        handler.removeCallbacks(updateVisualizer);
//        if (speechRecognizer != null) {
//            speechRecognizer.destroy();
//        }
    }

//    @Override
//    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//        switch (requestCode) {
//            case 1: {
//                // If request is cancelled, the result arrays are empty.
//                if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                    // Permission was granted
//                } else {
//                    Intent intent = new Intent(this, PatientRecordingActivity.class);
//                    startActivity(intent);
//                }
//                return;
//            }
//        }
//    }

    public void OnBackButtonClick(View view) {
        Intent intent = new Intent(this, PatientActivity.class);
        startActivity(intent);
    }

    public void OnCancelClick(View view) {
        Intent intent = new Intent(this, PatientActivity.class);
        startActivity(intent);
    }
}
