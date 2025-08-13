// The base URL for your Express backend.
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export const getApplicantProfile = async (token) => {
    const response = await fetch(`${API_BASE_URL}/applicants/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

/**
 * Creates a new applicant profile for the authenticated user.
 * @param {string} token The user's authentication token.
 * @param {object} profileData The profile data from the form.
 * @returns {Promise<object>} The response data from the backend.
 */
export const createApplicantProfile = async (token, profileData) => {
    const response = await fetch(`${API_BASE_URL}/applicants/profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
    });
    return response.json();
};


/**
 * Fetches all education entries for the authenticated user.
 * @param {string} token The user's authentication token.
 * @returns {Promise<object>} The response data from the backend.
 */
 export const getEducation = async (token) => {
    const response = await fetch(`${API_BASE_URL}/applicants/education`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

/**
 * Creates a new education entry for the authenticated user.
 * @param {string} token The user's authentication token.
 * @param {object} educationData The education data from the form.
 * @returns {Promise<object>} The response data from the backend.
 */
export const createEducation = async (token, educationData) => {
    const response = await fetch(`${API_BASE_URL}/applicants/education`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(educationData)
    });
    return response.json();
};

/**
 * Fetches all experience entries for the authenticated user.
 * @param {string} token The user's authentication token.
 * @returns {Promise<object>} The response data from the backend.
 */
 export const getExperience = async (token) => {
    const response = await fetch(`${API_BASE_URL}/applicants/experience`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

/**
 * Creates a new experience entry for the authenticated user.
 * @param {string} token The user's authentication token.
 * @param {object} experienceData The experience data from the form.
 * @returns {Promise<object>} The response data from the backend.
 */
export const createExperience = async (token, experienceData) => {
    const response = await fetch(`${API_BASE_URL}/applicants/experience`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(experienceData)
    });
    return response.json();
};
