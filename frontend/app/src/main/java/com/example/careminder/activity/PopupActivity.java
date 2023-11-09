package com.example.careminder.activity;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.careminder.R;
import com.example.careminder.adpater.RequestAdapter;
import com.example.careminder.dummy.RequestDummy;

import java.util.ArrayList;
import java.util.List;

public class PopupActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.popup_layout);

        List<RequestDummy> dummyDataList = new ArrayList<>();
        dummyDataList.add(new RequestDummy("Request 1", "Description 1"));
        dummyDataList.add(new RequestDummy("Request 2", "Description 2"));
        dummyDataList.add(new RequestDummy("Request 3", "Description 3"));

        RecyclerView recyclerView = findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        RequestAdapter adapter = new RequestAdapter(dummyDataList);
        recyclerView.setAdapter(adapter);
    }
}
