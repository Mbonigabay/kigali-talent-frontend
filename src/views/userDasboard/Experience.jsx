import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getExperience } from '../../services/applicantService';
import ExperienceForm from '../../components/ExperienceForm.jsx';

export default function Experience() {
    const { token, isAuthenticated } = useSelector((state) => state.auth);
    const [experienceEntries, setExperienceEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchExperience = async () => {
        if (!isAuthenticated || !token) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const response = await getExperience(token);
            if (response.code === 200) {
                setExperienceEntries(response.payload);
            } else if (response.code === 404) {
                setExperienceEntries([]);
            } else {
                throw new Error(response.message || 'Failed to fetch experience.');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperience();
    }, [isAuthenticated, token]);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h2>Loading experience...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }
    
    if (showForm) {
        return <ExperienceForm onClose={() => setShowForm(false)} onExperienceCreated={fetchExperience} />;
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">My Experience</h1>
                <button onClick={() => setShowForm(true)} className="btn btn-primary">
                    Add Experience
                </button>
            </div>
            {experienceEntries.length > 0 ? (
                <div className="card shadow-sm p-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Role</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {experienceEntries.map(exp => (
                                <tr key={exp.id}>
                                    <td>{exp.companyName}</td>
                                    <td>{exp.role}</td>
                                    <td>{exp.startDate}</td>
                                    <td>{exp.endDate || 'Present'}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info me-2">Edit</button>
                                        <button className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="card shadow-sm p-4 text-center">
                    <p className="lead">You do not have any experience entries yet.</p>
                    <button onClick={() => setShowForm(true)} className="btn btn-primary w-50 mx-auto mt-3">
                        Add Experience
                    </button>
                </div>
            )}
        </div>
    );
}
