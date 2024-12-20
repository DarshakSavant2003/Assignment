import React, { useState } from "react";
import JobForm from "./JobForm";
import JobTable from "./JobTable";

const Admin = () => {
  const [jobListings, setJobListings] = useState([]);

  const handleAddJob = (newJob) => {
    setJobListings([...jobListings, newJob]);
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
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <h1 className="text-center py-4 bg-primary text-white m-0">Admin Panel</h1>
      
      <div className="row m-0" style={{ flex: 1 }}>
        {/* Job Form Section */}
        <div className="col-md-6 p-4">
          <div 
            className="bg-white rounded shadow h-100 p-4"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <h4 className="text-primary text-center mb-4">Add a New Job</h4>
            <JobForm onAddJob={handleAddJob} />
          </div>
        </div>

        {/* Job Table Section */}
        <div className="col-md-6 p-4">
          <div 
            className="bg-white rounded shadow h-100 p-4"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <h4 className="text-primary text-center mb-4">Job Listings</h4>
            <div className="overflow-auto">
              <JobTable jobListings={jobListings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;