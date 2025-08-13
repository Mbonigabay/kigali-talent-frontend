// The base URL for your Express backend.
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

/**
 * Fetches all published jobs from the backend.
 * @returns {Promise<object>} The response data from the backend.
 */
export const fetchPublishedJobs = async () => {
  const response = await fetch(`${API_BASE_URL}/jobs`);
  return response.json();
};

/**
 * Fetches a single job by its slug.
 * @param {string} slug The job's slug.
 * @returns {Promise<object>} The response data from the backend.
 */
 export const fetchJobBySlug = async (slug) => {
    const response = await fetch(`${API_BASE_URL}/jobs/${slug}`);
    return response.json();
  };

  /**
 * Fetches a single job by its ID.
 * @param {string} token The user's authentication token.
 * @param {string} id The job's ID.
 * @returns {Promise<object>} The response data from the backend.
 */
export const fetchJobById = async (token, id) => {
  const response = await fetch(`${API_BASE_URL}/jobs/id/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
  

/**
 * Fetches all companies from the backend.
 * @returns {Promise<object>} The response data from the backend.
 */
export const fetchCompanies = async () => {
  const response = await fetch(`${API_BASE_URL}/companies`);
  return response.json();
};

/**
 * Fetches all jobs from the backend.
 * @param {string} token The user's authentication token.
 * @returns {Promise<object>} The response data from the backend.
 */
 export const fetchAllJobs = async (token) => {
  const response = await fetch(`${API_BASE_URL}/jobs/all`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

/**
 * Updates a job's status via a PUT request to the backend.
 * @param {string} token The user's authentication token.
 * @param {string} jobNumber The unique number of the job to update.
 * @param {string} action The action to perform (e.g., 'PUBLISH').
 * @returns {Promise<object>} The response data from the backend.
 */
 export const updateJobStatus = async (token, jobNumber, action) => {
  const response = await fetch(`${API_BASE_URL}/jobs/update-job/status`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ jobNumber, action })
  });
  return response.json();
};

/**
 * Creates a new job.
 * @param {string} token The user's authentication token.
 * @param {object} jobData The job data to create.
 * @returns {Promise<object>} The response data from the backend.
 */
 export const createJob = async (token, jobData) => {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(jobData)
  });
  return response.json();
};