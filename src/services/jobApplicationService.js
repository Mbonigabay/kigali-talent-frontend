// The base URL for your Express backend.
const API_BASE_URL = "http://localhost:8000/api";

/**
 * Checks if a user has already applied for a specific job.
 * @param {string} token The user's authentication token.
 * @param {string} jobId The ID of the job to check.
 * @returns {Promise<object>} The response data from the backend.
 */
export const fetchApplicationStatus = async (token, jobId) => {
  const response = await fetch(
    `${API_BASE_URL}/job-applications/${jobId}/status`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

/**
 * Fetches all job applications for a specific job.
 * @param {string} token The user's authentication token.
 * @param {string} jobId The ID of the job to fetch applications for.
 * @returns {Promise<object>} The response data from the backend.
 */
export const fetchApplicationsForJob = async (token, jobId) => {
  const response = await fetch(
    `${API_BASE_URL}/job-applications/jobs/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

/**
 * Submits a job application for the authenticated user.
 * @param {string} token The user's authentication token.
 * @param {string} jobNumber The ID of the job to apply for.
 * @returns {Promise<object>} The response data from the backend.
 */
export const submitApplication = async (token, jobNumber) => {
  const response = await fetch(
    `${API_BASE_URL}/job-applications/${jobNumber}/apply`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};


/**
 * Fetches all applications for the authenticated user.
 * @param {string} token The user's authentication token.
 * @returns {Promise<object>} The response data from the backend.
 */
 export const fetchMyApplications = async (token) => {
  const response = await fetch(`${API_BASE_URL}/job-applications/my-applications`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
  return response.json();
};

/**
 * Updates a job application's status via a PUT request to the backend.
 * @param {string} token The user's authentication token.
 * @param {string} jobApplicationId The ID of the job application.
 * @param {string} action The action to perform (e.g., 'VIEW').
 * @returns {Promise<object>} The response data from the backend.
 */
export const updateJobApplicationStatus = async (
  token,
  jobApplicationId,
  action
) => {
  const response = await fetch(
    `${API_BASE_URL}/job-applications/update-job-application/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ jobApplicationId, action }),
    }
  );
  return response.json();
};
