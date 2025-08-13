import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getEducation } from '../../services/applicantService';
import EducationForm from '../../components/EducationForm.jsx';

export default function Education() {
    const { token, isAuthenticated } = useSelector((state) => state.auth);
    const [educationEntries, setEducationEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchEducation = async () => {
        if (!isAuthenticated || !token) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const response = await getEducation(token);
            if (response.code === 200) {
                setEducationEntries(response.payload);
            } else if (response.code === 404) {
                setEducationEntries([]);
            } else {
                throw new Error(response.message || 'Failed to fetch education.');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEducation();
    }, [isAuthenticated, token]);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h2>Loading education...</h2>
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
        return <EducationForm onClose={() => setShowForm(false)} onEducationCreated={fetchEducation} />;
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0">My Education</h1>
                <button onClick={() => setShowForm(true)} className="btn btn-primary">
                    Add Education
                </button>
            </div>
            {educationEntries.length > 0 ? (
                <div className="card shadow-sm p-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>School</th>
                                <th>Level</th>
                                <th>Field of Study</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {educationEntries.map(edu => (
                                <tr key={edu.id}>
                                    <td>{edu.school}</td>
                                    <td>{edu.levelOfEducation}</td>
                                    <td>{edu.fieldOfStudy}</td>
                                    <td>{edu.yearOfGraduation}</td>
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
                    <p className="lead">You do not have any education entries yet.</p>
                    <button onClick={() => setShowForm(true)} className="btn btn-primary w-50 mx-auto mt-3">
                        Add Education
                    </button>
                </div>
            )}
        </div>
    );
}
