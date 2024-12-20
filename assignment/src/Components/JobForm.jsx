import React, { useState } from "react";

export const JobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    contact_email: "",
    description: "",
  });
  const [statusMessage, setStatusMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/admin/add-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage("Job added successfully!");
        setFormData({
          title: "",
          location: "",
          salary: "",
          contact_email: "",
          description: "",
        });
      } else {
        setStatusMessage("Failed to add job. Please try again.");
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please check your network.");
    }
  };

  // Function to handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-light p-4 rounded shadow-sm align-items-center justify-content-center"
    >
      <h4 className="mb-4 text-primary">Add Job Details</h4>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter job title"
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter job location"
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="salary" className="form-label">
          Salary
        </label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Enter salary (e.g., 50000)"
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="contact_email" className="form-label">
          Contact Email
        </label>
        <input
          type="email"
          id="contact_email"
          name="contact_email"
          value={formData.contact_email}
          onChange={handleChange}
          placeholder="Enter contact email"
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Job Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter job description"
          className="form-control"
          rows="4"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Add Job
      </button>

      {statusMessage && (
        <div className="mt-3 alert alert-info" role="alert">
          {statusMessage}
        </div>
      )}
    </form>
  );
};

export default JobForm;
