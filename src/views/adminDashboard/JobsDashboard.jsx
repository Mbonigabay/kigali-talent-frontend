import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchAllJobs, updateJobStatus } from "../../services/jobService";
import { fetchApplicationsForJob } from "../../services/jobApplicationService";
import { getPossibleActions } from "../../stateMachine/jobStateMachine";
import JobForm from "../../components/JobForm.jsx";

export default function JobsDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  const getJobs = async () => {
    if (!isAuthenticated || !token) {
      setLoading(false);
      setError("Authentication token is missing. Please log in.");
      return;
    }
    try {
      const data = await fetchAllJobs(token);

      if (data.code === 200) {
        setJobs(data.payload);
      } else {
        throw new Error(
          data.message || "An error occurred while fetching jobs."
        );
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, [token, isAuthenticated]);

  const handleApplicationLink = async (jobId) => {
    if (!isAuthenticated || !token) {
      alert("Authentication token is missing. Please log in.");
      return;
    }
    try {
      const data = await fetchApplicationsForJob(token, jobId);
      if (data.code === 200) {
        navigate("/admin/applications", {
          state: { applications: data.payload, jobId },
        });
      }
    } catch (e) {
      alert("Failed to fetch applications.");
    }
  };

  const handleAction = async (jobNumber, action) => {
    try {
      const data = await updateJobStatus(token, jobNumber, action);
      alert(data.message);
      getJobs(); // Refresh the job list after a successful update
    } catch (e) {
      alert(e.message);
    }
  };

  const renderActionButtons = (jobStatus, jobNumber) => {
    const actions = getPossibleActions(jobStatus);
    if (actions.length === 0) {
      return null;
    }

    return actions.map((action) => (
      <button
        key={action}
        className="btn btn-sm btn-primary me-2"
        onClick={() => handleAction(jobNumber, action)}
      >
        {action.charAt(0).toUpperCase() + action.slice(1)}
      </button>
    ));
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading jobs...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }

  if (showForm) {
    return (
      <JobForm onClose={() => setShowForm(false)} onJobCreated={getJobs} />
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Job Management</h1>
        <button onClick={() => setShowForm(true)} className="btn btn-primary">
          Create New Job
        </button>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Job Title</th>
                <th scope="col">Company</th>
                <th scope="col">Status</th>
                <th scope="col">Applications</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    <Link to={`/jobs/${job.slug}`}>{job.title}</Link>
                  </td>
                  <td>{job.companyName}</td>
                  <td>{job.jobStatus}</td>
                  <td>
                    <Link onClick={() => handleApplicationLink(job.id)}>
                      View Applications ({job.applicationsCount})
                    </Link>
                  </td>
                  <td>{renderActionButtons(job.jobStatus, job.jobNumber)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
