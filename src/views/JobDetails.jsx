import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import { useSelector } from 'react-redux';
import { fetchJobBySlug, fetchCompanies } from '../services/jobService';
import { fetchApplicationStatus, submitApplication } from '../services/jobApplicationService';

export default function JobDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);

  const [job, setJob] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const getJobAndCompanies = async () => {
      try {
        const [jobData, companiesData] = await Promise.all([
          fetchJobBySlug(slug),
          fetchCompanies()
        ]);

        if (jobData.code === 200) {
          setJob(jobData.payload);
        } else {
          throw new Error(jobData.message || 'An error occurred while fetching job details.');
        }

        if (companiesData.code === 200) {
          setCompanies(companiesData.payload);
        } else {
          throw new Error(companiesData.message || 'An error occurred while fetching companies.');
        }

        if (isAuthenticated && jobData.payload) {
            const applicationStatusData = await fetchApplicationStatus(token, jobData.payload.id);
            if (applicationStatusData.code === 200 && applicationStatusData.payload.hasApplied) {
                setHasApplied(true);
            }
        }

      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    getJobAndCompanies();
  }, [slug, isAuthenticated, token]);
  
  const company = job ? companies.find(c => c.id === job.companyId) : null;
  const isAdmin = user?.role === 'ROLE_ADMIN';
  const isApplicant = user?.role === 'ROLE_APPLICANT';

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isApplicant) {
      alert('You must have an applicant account to apply for a job.');
      return;
    }

    setIsApplying(true);
    try {
      const data = await submitApplication(token, job.jobNumber);

      if (data.code === 201) {
        alert('You have successfully applied for the job!');
        setHasApplied(true);
      } else {
        alert(data.message || 'An error occurred while applying.');
      }
    } catch (e) {
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };


  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading job details...</h2>
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

  if (!job) {
    return (
      <div className="container mt-5 text-center">
        <h2>Job not found.</h2>
        <button onClick={() => navigate('/')} className="btn btn-primary mt-3">
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{minHeight: '80vh'}}>
      <div className="row">
        {/* Main content section */}
        <div className="col-md-8">
          <h1 className="display-5 fw-bold mb-4">{job.title}</h1>
          
          {/* Job description card */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold mb-3">Job Description</h4>
              {/* Render the markdown content securely */}
              <div dangerouslySetInnerHTML={{ __html: marked.parse(job.description) }} />
              {hasApplied ? (
                <button className="btn btn-secondary mt-4 w-100" disabled>
                  You have already applied to this job
                </button>
              ) : (
                <button 
                  onClick={handleApply} 
                  className="btn btn-primary mt-4 w-100"
                  disabled={isApplying || isAdmin}
                >
                  {isApplying ? 'Applying...' : isAdmin ? 'Admin can not apply' : 'Apply for this job'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-md-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body bg-warning rounded">
              <h5 className="card-title fw-bold">{company ? company.name : 'Unknown'}</h5>
              <p className="card-text mb-0">Location: {company ? company.location : 'Unknown'}</p>
              <p className="card-text mb-0">Website: <a href={company?.website} target="_blank" rel="noopener noreferrer">{company?.website}</a></p>
              {company && company.description && (
                <>
                  <hr className="my-2" />
                  <p className="card-text text-muted small">{company.description}</p>
                </>
              )}
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold">Job Summary</h5>
              <hr />
              <p className="mb-1"><strong>Experience:</strong> {job.yearsOfExperienceNeed}</p>
              <p className="mb-1"><strong>Location Type:</strong> {job.locationType.charAt(0).toUpperCase() + job.locationType.slice(1)}</p>
              <p className="mb-1"><strong>Published On:</strong> {job.datePublished}</p>
              <p className="mb-1"><strong>Application Deadline:</strong> {job.deadline}</p>
              <p className="mb-0"><strong>Openings:</strong> {job.numberOfOpenPosition}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
