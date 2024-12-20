import React, { useState, useEffect } from "react";

const JobTable = () => {
  const [jobListings, setJobListings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch job listings from the backend
    const fetchJobListings = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/jobs"); // Update with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setJobListings(data);
        } else {
          setError("Failed to fetch job listings.");
        }
      } catch (err) {
        setError("An error occurred while fetching job listings.");
      }
    };

    fetchJobListings();
  }, []);

  return (
    <div>
      <h2 className="my-4">Job Listings</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Description</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Contact</th>
            
          </tr>
        </thead>
        <tbody>
          {jobListings.length > 0 ? (
            jobListings.map((job, index) => (
              <tr key={index}>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td>{job.contact_email}</td>
              
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No job listings available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
