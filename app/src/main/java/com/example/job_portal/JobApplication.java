package com.example.job_portal;

public class JobApplication {
    private String candidate_name;
    private String contact;
    private int job_id;

    public JobApplication(String candidate_name, String contact, int job_id) {
        this.candidate_name = candidate_name;
        this.contact = contact;
        this.job_id = job_id;
    }

    // Getters and Setters
    public String getCandidateName() { return candidate_name; }
    public String getContact() { return contact; }
    public int getJobId() { return job_id; }
}

