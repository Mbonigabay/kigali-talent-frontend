export const JOB_STATUS = {
    CREATED: 'created',
    PUBLISHED: 'published',
    CLOSED_FOR_APPLICATION: 'closedForApplication',
    SHORTLISTED: 'shortlisted',
    INTERVIEW: 'interview',
    OFFER_SENT: 'offerSent',
    CLOSED: 'closed'
};

const jobStateMachine = {
    [JOB_STATUS.CREATED]: {
        PUBLISH: JOB_STATUS.PUBLISHED,
        CLOSE: JOB_STATUS.CLOSED
    },
    [JOB_STATUS.PUBLISHED]: {
        CLOSE_FOR_APPLICATION: JOB_STATUS.CLOSED_FOR_APPLICATION,
        CLOSE: JOB_STATUS.CLOSED
    },
    [JOB_STATUS.CLOSED_FOR_APPLICATION]: {
        SHORTLIST: JOB_STATUS.SHORTLISTED,
        CLOSE: JOB_STATUS.CLOSED
    },
    [JOB_STATUS.SHORTLISTED]: {
        INTERVIEW: JOB_STATUS.INTERVIEW,
        CLOSE: JOB_STATUS.CLOSED
    },
    [JOB_STATUS.INTERVIEW]: {
        OFFER_SENT: JOB_STATUS.OFFER_SENT,
        CLOSE: JOB_STATUS.CLOSED
    },
    [JOB_STATUS.OFFER_SENT]: {
        CLOSE: JOB_STATUS.CLOSED
    },
    [JOB_STATUS.CLOSED]: {} // No events can change the status from 'closed'
};

/**
 * Checks if a status transition is valid for a given action.
 * @param {string} currentState The job's current status.
 * @param {string} action The event to trigger the status change.
 * @returns {string|null} The next state if the transition is valid, otherwise null.
 */
const checkTransition = (currentState, action) => {
    return jobStateMachine[currentState]?.[action] || null;
};

/**
 * Changes a job's state based on a specific action.
 * @param {string} currentState The job's current status.
 * @param {string} action The event to trigger the status change.
 * @returns {string} The new state after a successful transition.
 * @throws {Error} If the state transition is invalid.
 */
export const changeState = (currentState, action) => {
    const nextState = checkTransition(currentState, action);
    if (!nextState) {
        throw new Error(`Invalid action '${action}' for current job status '${currentState}'.`);
    }
    return nextState;
};

/**
 * Gets a list of all possible actions for a given status.
 * @param {string} jobStatus The job's current status.
 * @returns {Array<string>} A list of possible actions.
 */
export const getPossibleActions = (jobStatus) => {
    const actions = jobStateMachine[jobStatus];
    return actions ? Object.keys(actions) : [];
};
