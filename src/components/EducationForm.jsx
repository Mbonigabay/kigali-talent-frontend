import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createEducation } from '../services/applicantService';

export default function EducationForm({ onClose, onEducationCreated }) {
    const { token } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({
        school: '',
        levelOfEducation: '',
        fieldOfStudy: '',
        description: '',
        yearOfGraduation: ''
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
            const response = await createEducation(token, formData);
            if (response.code === 201) {
                alert('Education entry created successfully!');
                onEducationCreated();
            } else {
                throw new Error(response.message || 'Failed to create education.');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <h1 className="mb-4">Add New Education</h1>
            <div className="card shadow-sm p-4">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="school" className="form-label">School</label>
                        <input type="text" className="form-control" id="school" name="school" value={formData.school} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="levelOfEducation" className="form-label">Level of Education</label>
                        <input type="text" className="form-control" id="levelOfEducation" name="levelOfEducation" value={formData.levelOfEducation} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fieldOfStudy" className="form-label">Field of Study</label>
                        <input type="text" className="form-control" id="fieldOfStudy" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" rows="3" value={formData.description} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yearOfGraduation" className="form-label">Year of Graduation</label>
                        <input type="number" className="form-control" id="yearOfGraduation" name="yearOfGraduation" value={formData.yearOfGraduation} onChange={handleChange} />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Education'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
