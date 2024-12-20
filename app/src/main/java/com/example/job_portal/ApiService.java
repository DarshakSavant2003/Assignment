package com.example.job_portal;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Body;
import java.util.List;

public interface ApiService {
    @GET("jobs")
    Call<List<Job>> getJobs();

    @POST("apply")
    Call<Void> applyForJob(@Body JobApplication application);
}

