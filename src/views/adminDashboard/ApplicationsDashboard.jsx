import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  updateJobApplicationStatus,
  fetchApplicationsForJob,
} from "../../services/jobApplicationService";
import { getPossibleActions } from "../../stateMachine/jobApplicationStateMachine";
import ApplicantProfileModal from "../../components/ApplicantProfileModal.jsx";
import { fetchJobById } from "../../services/jobService";

export default function ApplicationsDashboard() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  const [jobTitle, setJobTitle] = useState('');
  const [applications, setApplications] = useState(state?.applications || []);
  const [jobId, setJobId] = useState(state?.jobId || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    // This effect runs once to set the initial jobId and fetch job title.
    if (state?.jobId) {
      setJobId(state.jobId);
    }
  }, [state]);

  useEffect(() => {
    // Fetch job details and applications when jobId or token change.
    const fetchData = async () => {
      if (!isAuthenticated || !token || !jobId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const jobData = await fetchJobById(token, jobId);
        if (jobData.code === 200) {
          setJobTitle(jobData.payload.title);
        }

        const applicationsData = await fetchApplicationsForJob(token, jobId);
        if (applicationsData.code === 200) {
          setApplications(applicationsData.payload);
        } else {
          throw new Error(applicationsData.message || 'Failed to fetch applications.');
        }

      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobId, isAuthenticated, token]);

  const handleAction = async (jobApplicationId, action) => {
    if (!isAuthenticated || !token) {
        alert('Authentication token is missing. Please log in.');
        return;
    }
    setLoading(true);
    try {
        const response = await updateJobApplicationStatus(token, jobApplicationId, action);
        if (response.code === 200) {
            alert(response.message);
            console.log("response::", response)
            // Optimistically update the local state to show the new status
            setApplications(prevApps => 
                prevApps.map(app => 
                    app.id === jobApplicationId ? { ...app, jobApplicationStatus: response?.payload?.newStatus } : app
                )
            );
        } else {
            throw new Error(response.message || 'Failed to update application status.');
        }
    } catch (e) {
        setError(e.message);
    } finally {
        setLoading(false);
    }
  };

  const renderActionButtons = (currentStatus, jobApplicationId) => {
    const actions = getPossibleActions(currentStatus);
    if (actions.length === 0) {
      return null;
    }
    return actions.map(action => (
      <button
        key={action}
        className="btn btn-sm btn-primary me-2"
        onClick={() => handleAction(jobApplicationId, action)}
      >
        {action.charAt(0).toUpperCase() + action.slice(1)}
      </button>
    ));
  };

  const openProfileModal = (applicant) => {
    setSelectedApplicant(applicant);
  };

  const closeProfileModal = () => {
    setSelectedApplicant(null);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading applications...</h2>
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

  if (!jobId) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning">
          No job applications data found. Please navigate from the Jobs Dashboard.
        </div>
        <button onClick={() => navigate('/admin/jobs')} className="btn btn-primary mt-3">
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h1 className="mb-4">Applications for Job: {jobTitle}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Applicant Name</th>
                <th scope="col">LinkedIn</th>
                <th scope="col">Status</th>
                <th scope="col">Date Applied</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No applications found for this job.</td>
                </tr>
              ) : (
                applications.map(app => (
                  <tr key={app.id}>
                    <td>{app.firstName} {app.lastName}</td>
                    <td>
                      {app.linkedin ? (
                        <a href={app.linkedin} target="_blank" rel="noopener noreferrer">
                          View LinkedIn
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td>{app.jobApplicationStatus}</td>
                    <td>{app.dateCreated}</td>
                    <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          onClick={() => openProfileModal(app)}
                        >
                          View Profile
                        </button>
                        {renderActionButtons(app.jobApplicationStatus, app.id)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedApplicant && (
          <ApplicantProfileModal applicant={selectedApplicant} onClose={closeProfileModal} />
      )}
    </div>
  );
}