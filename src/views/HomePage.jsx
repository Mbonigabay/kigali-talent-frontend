import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPublishedJobs } from "../services/jobService";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchPublishedJobs();

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

    getJobs();
  }, []);

  // Helper function to format the experience string
  const formatExperience = (experience) => {
    if (experience === "0") {
      return "No experience needed";
    } else if (experience && !experience.includes("-")) {
      return `${experience}+ years of experience`;
    }
    return `${experience} years`;
  };

  // Filter jobs based on the search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <>
      <style>
        {`
          .btn-primary {
            background-color: #2d232e !important;
            border-color: #2d232e !important;
            border-radius: 0 !important;
          }
        `}
      </style>
      <div className="container">
        <section id="search-hero" className="py-5 mb-4">
          <div className="text-center">
            <h1 className="display-4">Find Your Dream Job</h1>
            <p className="lead">
              Search thousands of jobs in your area and find the perfect one for
              you.
            </p>
            <div className="input-group mx-auto" style={{ maxWidth: "600px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by title, company, or keyword..."
                aria-label="Search jobs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </section>
        <section id="jobs" className="mt-5">
          <h2 className="mb-4">Latest Jobs</h2>
          <div className="row g-4">
            {filteredJobs.length === 0 ? (
              <div className="col-12 text-center">
                <p>No jobs are currently published.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div className="col-md-6" key={job.id}>
                  <Link
                    to={`/jobs/${job.slug}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="card shadow-sm rounded-lg p-4 h-100">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title fw-bold">
                          {job.title} (
                          {job.locationType.charAt(0).toUpperCase() +
                            job.locationType.slice(1)}{" "}
                          -{" "}
                          {job.jobType.charAt(0).toUpperCase() +
                            job.jobType.slice(1)}
                          )
                        </h5>
                      </div>
                      <h6 className="card-subtitle mb-3 text-muted">
                        {job.companyName}
                      </h6>
                      <div className="d-flex align-items-center mb-2">
                        <span className="text-secondary me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-briefcase"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zM1.5 4a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-8z" />
                          </svg>
                        </span>
                        <span className="card-text text-secondary">
                          {formatExperience(job.yearsOfExperienceNeed)}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="text-secondary me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-geo-alt"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.349 31.493 31.493 0 0 1 5.8 12.01c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.304 1.867-.834 2.94zM8 1a6 6 0 0 0-6 6c0 1.719.664 3.42 1.83 5.01a34.789 34.789 0 0 0 5.17 3.324A34.789 34.789 0 0 0 12.17 12.01C13.336 10.42 14 8.719 14 6a6 6 0 0 0-6-6z" />
                            <path d="M8 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                          </svg>
                        </span>
                        <span className="card-text text-secondary">
                          {job.location}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mt-auto pt-3">
                        <p className="text-muted small mb-0">
                          Deadline: {job.deadline}
                        </p>
                        <p className="text-muted small mb-0">
                          Published: {job.datePublished}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}
