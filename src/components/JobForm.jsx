import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { marked } from 'marked';
import { createJob } from '../services/jobService';

export default function JobForm({ onClose, onJobCreated }) {
    const { token } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        title: '',
        companyName: '',
        location: '',
        locationType: 'onsite',
        deadline: '',
        jobType: 'fulltime',
        yearsOfExperienceNeed: '',
        numberOfOpenPosition: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await createJob(token, formData);
            if (response.code === 201) {
                alert('Job created successfully!');
                onJobCreated();
            } else {
                throw new Error(response.message || 'Failed to create job.');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <h1 className="mb-4">Create New Job</h1>
            <div className="card shadow-sm p-4">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="title" className="form-label">Job Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="companyName" className="form-label">Company Name</label>
                            <input type="text" className="form-control" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="locationType" className="form-label">Location Type</label>
                            <select className="form-control" id="locationType" name="locationType" value={formData.locationType} onChange={handleChange}>
                                <option value="onsite">Onsite</option>
                                <option value="remote">Remote</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="deadline" className="form-label">Application Deadline</label>
                            <input type="date" className="form-control" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="jobType" className="form-label">Job Type</label>
                            <select className="form-control" id="jobType" name="jobType" value={formData.jobType} onChange={handleChange}>
                                <option value="fulltime">Full-time</option>
                                <option value="partime">Part-time</option>
                                <option value="volunteer">Volunteer</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="yearsOfExperienceNeed" className="form-label">Years of Experience</label>
                            <input type="text" className="form-control" id="yearsOfExperienceNeed" name="yearsOfExperienceNeed" value={formData.yearsOfExperienceNeed} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="numberOfOpenPosition" className="form-label">Number of Open Positions</label>
                            <input type="number" className="form-control" id="numberOfOpenPosition" name="numberOfOpenPosition" value={formData.numberOfOpenPosition} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Job Description (Markdown)</label>
                        <div className="row">
                            <div className="col-md-6">
                                <textarea className="form-control" id="description" name="description" rows="10" value={formData.description} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <div className="card p-3 bg-light h-100">
                                    <small className="text-muted mb-2">Markdown Preview</small>
                                    <div dangerouslySetInnerHTML={{ __html: marked.parse(formData.description) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Job'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
