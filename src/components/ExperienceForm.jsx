import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createExperience } from '../services/applicantService';

export default function ExperienceForm({ onClose, onExperienceCreated }) {
    const { token } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        companyName: '',
        role: '',
        startDate: '',
        endDate: '',
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
            const response = await createExperience(token, formData);
            if (response.code === 201) {
                alert('Experience entry created successfully!');
                onExperienceCreated();
            } else {
                throw new Error(response.message || 'Failed to create experience.');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <h1 className="mb-4">Add New Experience</h1>
            <div className="card shadow-sm p-4">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="companyName" className="form-label">Company Name</label>
                        <input type="text" className="form-control" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} required />
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="startDate" className="form-label">Start Date</label>
                            <input type="date" className="form-control" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="endDate" className="form-label">End Date</label>
                            <input type="date" className="form-control" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Job Description</label>
                        <textarea className="form-control" id="description" name="description" rows="3" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Experience'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
