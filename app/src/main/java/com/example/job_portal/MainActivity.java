package com.example.job_portal;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.squareup.retrofit2.Call;
import com.squareup.retrofit2.Callback;
import com.squareup.retrofit2.Response;
import com.squareup.retrofit2.Retrofit;
import com.squareup.retrofit2.converter.gson.GsonConverterFactory;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private static final String BASE_URL = "http://localhost:5000/"; // Change this to your backend URL if required
    private TextView jobListText;
    private EditText messageInput;
    private Button sendButton;
    private RecyclerView chatRecyclerView;
    private List<String> chatMessages;
    private ChatAdapter chatAdapter;

    private ApiService apiService;  // For Job Listings
    private OpenAIService openAIService; // For ChatGPT

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        jobListText = findViewById(R.id.jobListText);
        messageInput = findViewById(R.id.messageInput);
        sendButton = findViewById(R.id.sendButton);
        chatRecyclerView = findViewById(R.id.chatRecyclerView);

        chatMessages = new ArrayList<>();
        chatAdapter = new ChatAdapter(chatMessages);
        chatRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        chatRecyclerView.setAdapter(chatAdapter);

        // Retrofit instance for Job Listings
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        apiService = retrofit.create(ApiService.class);

        // Retrofit instance for OpenAI (ChatGPT)
        openAIService = new Retrofit.Builder()
                .baseUrl("https://api.openai.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(OpenAIService.class);

        // Fetch job listings
        fetchJobListings();

        // Send message to ChatGPT
        sendButton.setOnClickListener(v -> sendMessageToChatGPT());
    }

    private void fetchJobListings() {
        apiService.getJobs().enqueue(new Callback<List<Job>>() {
            @Override
            public void onResponse(Call<List<Job>> call, Response<List<Job>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    StringBuilder jobs = new StringBuilder();
                    for (Job job : response.body()) {
                        jobs.append("Title: ").append(job.getTitle()).append("\n")
                                .append("Location: ").append(job.getLocation()).append("\n\n");
                    }
                    jobListText.setText(jobs.toString());
                } else {
                    jobListText.setText("Failed to load jobs.");
                }
            }

            @Override
            public void onFailure(Call<List<Job>> call, Throwable t) {
                Log.e("MainActivity", "Error fetching jobs", t);
                jobListText.setText("Error fetching jobs.");
            }
        });
    }

    private void sendMessageToChatGPT() {
        String userMessage = messageInput.getText().toString().trim();
        if (!userMessage.isEmpty()) {
            chatMessages.add("You: " + userMessage);
            chatAdapter.notifyDataSetChanged();

            messageInput.setText("");

            // Create request object for ChatGPT
            ArrayList<ChatRequest.Message> messages = new ArrayList<>();
            messages.add(new ChatRequest.Message("user", userMessage));
            ChatRequest request = new ChatRequest(messages);

            // Make API call to OpenAI
            openAIService.getChatResponse(request).enqueue(new Callback<ChatResponse>() {
                @Override
                public void onResponse(Call<ChatResponse> call, Response<ChatResponse> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        String chatGPTMessage = response.body().getResponseMessage();
                        chatMessages.add("ChatGPT: " + chatGPTMessage);
                        chatAdapter.notifyDataSetChanged();
                    } else {
                        Log.e("MainActivity", "Error fetching ChatGPT response");
                        chatMessages.add("ChatGPT: Error");
                        chatAdapter.notifyDataSetChanged();
                    }
                }

                @Override
                public void onFailure(Call<ChatResponse> call, Throwable t) {
                    Log.e("MainActivity", "Error fetching ChatGPT response", t);
                    chatMessages.add("ChatGPT: Error");
                    chatAdapter.notifyDataSetChanged();
                }
            });
        }
    }
}
