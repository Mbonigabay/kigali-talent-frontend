import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchMyApplications } from "../../services/jobApplicationService";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const getApplications = async () => {
      if (!isAuthenticated || !token) {
        setLoading(false);
        setError("Authentication token is missing. Please log in.");
        return;
      }
      try {
        const data = await fetchMyApplications(token);

        if (data.code === 200) {
          setApplications(data.payload);
        } else {
          throw new Error(
            data.message || "An error occurred while fetching applications."
          );
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    getApplications();
  }, [token, isAuthenticated]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading your applications...</h2>
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
    <div className="container-fluid">
      <h1 className="mb-4">My Applications</h1>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Job Title</th>
                <th scope="col">Company</th>
                <th scope="col">Location</th>
                <th scope="col">Status</th>
                <th scope="col">Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    You have not applied for any jobs yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.jobTitle}</td>
                    <td>{app.companyName}</td>
                    <td>
                      {app.location} ({app.locationType})
                    </td>
                    <td>{app.jobApplicationStatus}</td>
                    <td>{app.dateCreated}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
