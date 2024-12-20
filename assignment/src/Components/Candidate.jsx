import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatbotInterface from "./ChatbotInterface";

function Candidate() {
  const [jobs, setJobs] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [application, setApplication] = useState({
    name: "",
    contact: "",
    jobId: "",
  });
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setApplication({ ...application, jobId: job.id });
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/apply", {
        candidate_name: application.name,
        contact: application.contact,
        job_id: application.jobId,
      });
      console.log("Application submitted:", response.data);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    }
  };

  return (
    <div 
      className="container-fluid"
      style={{ 
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        width: '100vw',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '20px' }}>
        {/* Job Search Section */}
        <div className="mb-5">
          <h2 className="text-center mb-4 text-primary">Available Jobs</h2>
          <div className="input-group mb-4">
            <input
              type="text"
              placeholder="Search by location"
              className="form-control"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              style={{ borderRadius: "20px", border: "1px solid #ddd" }}
            />
          </div>
          <div className="row">
            {filteredJobs.length ? (
              filteredJobs.map((job) => (
                <div className="col-md-6 mb-4" key={job.id}>
                  <div
                    className="card shadow-sm border-light"
                    onClick={() => handleJobSelect(job)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "10px",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    <div className="card-body">
                      <h5 className="card-title text-primary">{job.title}</h5>
                      <p className="card-text">{job.description}</p>
                      <small className="text-muted">
                        Location: {job.location} | Salary: {job.salary}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center text-muted">No jobs found</div>
            )}
          </div>
        </div>

        {/* Job Application Form Section */}
        {selectedJob && (
          <div className="card p-4 mb-5 shadow-lg border-light rounded">
            <h4 className="text-center mb-4 text-primary">Apply for: {selectedJob.title}</h4>
            <form onSubmit={handleApplicationSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Candidate Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={application.name}
                  onChange={(e) =>
                    setApplication({ ...application, name: e.target.value })
                  }
                  required
                  style={{ borderRadius: "10px" }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  className="form-control"
                  value={application.contact}
                  onChange={(e) =>
                    setApplication({ ...application, contact: e.target.value })
                  }
                  required
                  style={{ borderRadius: "10px" }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="jobId" className="form-label">
                  Job ID
                </label>
                <input
                  type="text"
                  id="jobId"
                  className="form-control"
                  value={application.jobId}
                  onChange={(e) =>
                    setApplication({ ...application, jobId: e.target.value })
                  }
                  disabled
                  style={{ borderRadius: "10px" }}
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-5 py-2">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Chatbot Button */}
        <div
          className="position-fixed bottom-0 end-0 m-4"
          style={{ zIndex: 1000 }}
        >
          <button
            className="btn btn-info px-4 py-3 rounded-circle"
            onClick={() => setShowChatbot(!showChatbot)}
            style={{ fontSize: "18px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)" }}
          >
            💬
          </button>
        </div>

        {/* Chatbot Interface */}
        {showChatbot && (
          <div
            className="position-fixed bottom-0 end-0 m-4 p-3 bg-white border rounded shadow-lg"
            style={{ maxWidth: "300px", height: "400px", overflowY: "auto" }}
          >
            <ChatbotInterface />
          </div>
        )}
      </div>
    </div>
  );
}

export default Candidate;