import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createApplicantProfile } from '../services/applicantService';

export default function ProfileForm({ onClose, onProfileCreated }) {
    const { token } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        linkedin: '',
        summary: '',
        skills: ''
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
            const response = await createApplicantProfile(token, formData);
            if (response.code === 201) {
                alert('Profile created successfully!');
                onProfileCreated();
            } else {
                throw new Error(response.message || 'Failed to create profile.');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <h1 className="mb-4">Create Your Profile</h1>
            <div className="card shadow-sm p-4">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="linkedin" className="form-label">LinkedIn Profile URL</label>
                        <input type="url" className="form-control" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="summary" className="form-label">Professional Summary</label>
                        <textarea className="form-control" id="summary" name="summary" rows="3" value={formData.summary} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="skills" className="form-label">Skills (comma-separated)</label>
                        <input type="text" className="form-control" id="skills" name="skills" value={formData.skills} onChange={handleChange} />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
