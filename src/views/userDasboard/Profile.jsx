import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getApplicantProfile } from '../../services/applicantService';
import ProfileForm from '../../components/ProfileForm.jsx';

export default function Profile() {
    const { token, isAuthenticated } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchProfile = async () => {
        if (!isAuthenticated || !token) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const response = await getApplicantProfile(token);
            if (response.code === 200) {
                setProfile(response.payload);
            } else if (response.code === 404) {
                setProfile(null);
            } else {
                throw new Error(response.message || 'Failed to fetch profile.');
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [isAuthenticated, token]);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <h2>Loading profile...</h2>
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
        return <ProfileForm onClose={() => setShowForm(false)} onProfileCreated={fetchProfile} />;
    }

    return (
        <div className="container-fluid">
            <h1 className="mb-4">My Profile</h1>
            {profile ? (
                <div className="card shadow-sm p-4">
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone Number:</strong> {profile.phoneNumber || 'N/A'}</p>
                    <p><strong>Address:</strong> {profile.address || 'N/A'}</p>
                    <p><strong>LinkedIn:</strong> {profile.linkedin ? <a href={profile.linkedin}>{profile.linkedin}</a> : 'N/A'}</p>
                    <p><strong>Summary:</strong> {profile.summary || 'N/A'}</p>
                    <p><strong>Skills:</strong> {profile.skills || 'N/A'}</p>
                    <button className="btn btn-primary mt-3">Edit Profile</button>
                </div>
            ) : (
                <div className="card shadow-sm p-4 text-center">
                    <p className="lead">You do not have a profile yet.</p>
                    <button onClick={() => setShowForm(true)} className="btn btn-primary w-50 mx-auto mt-3">
                        Create Profile
                    </button>
                </div>
            )}
        </div>
    );
}
