import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
    const [activeLink, setActiveLink] = useState('jobs');

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
                    <Link to="/admin" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span className="fs-4">Admin Dashboard</span>
                    </Link>
                    <hr />
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link
                                to="/admin/jobs"
                                onClick={() => handleLinkClick('jobs')}
                                className={`nav-link ${activeLink === 'jobs' ? 'active' : ''}`}
                            >
                                Jobs
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/companies"
                                onClick={() => handleLinkClick('companies')}
                                className={`nav-link ${activeLink === 'companies' ? 'active' : ''}`}
                            >
                                Companies
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/users"
                                onClick={() => handleLinkClick('users')}
                                className={`nav-link ${activeLink === 'users' ? 'active' : ''}`}
                            >
                                Users
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Main Content Area */}
                <div className="p-4 flex-grow-1 card border-0 shadow-sm rounded-lg ms-4 bg-light" style={{ minHeight: '80vh' }}>
                    {/* The Outlet component will render the content of the nested routes here. */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
