import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function UserLayout() {
    const [activeLink, setActiveLink] = useState('profile');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className="container my-4">
            <style>
                {`
                .nav-link.active {
                    background-color: #212529 !important;
                    color: white !important;
                }
                .nav-link {
                    color: black;
                }
                `}
            </style>
            <div className="d-flex flex-row justify-content-center">
                {/* Left Sidebar */}
                <div className="d-flex flex-column flex-shrink-0 p-3 card border-0 shadow-sm rounded-lg" style={{ width: '280px' }}>
                    <Link to="/user" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span className="fs-4">User Dashboard</span>
                    </Link>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link
                                to="/user/profile"
                                onClick={() => handleLinkClick('profile')}
                                className={`nav-link ${activeLink === 'profile' ? 'active' : ''}`}
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/user/education"
                                onClick={() => handleLinkClick('education')}
                                className={`nav-link ${activeLink === 'education' ? 'active' : ''}`}
                            >
                                Education
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/user/experience"
                                onClick={() => handleLinkClick('experience')}
                                className={`nav-link ${activeLink === 'experience' ? 'active' : ''}`}
                            >
                                Experience
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/user/applications"
                                onClick={() => handleLinkClick('applications')}
                                className={`nav-link ${activeLink === 'applications' ? 'active' : ''}`}
                            >
                                Applications
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="p-4 flex-grow-1 card border-0 shadow-sm rounded-lg ms-4 bg-light" style={{ minHeight: '80vh' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
