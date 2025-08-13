// The base URL for your Express backend.
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

/**
 * Sends a registration request to the backend.
 * @param {object} userData The user's username and password.
 * @returns {Promise<object>} The response data from the backend.
 */
export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};

/**
 * Requests an account verification token for a given username.
 * @param {string} username The user's email address.
 * @returns {Promise<object>} The response data from the backend.
 */
export const requestVerificationToken = async (username) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-account-request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  });
  return response.json();
};

/**
 * Sends a login request to the backend.
 * @param {object} credentials The user's username and password.
 * @returns {Promise<object>} The response data from the backend.
 */
 export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    return response.json();
  };