import React from 'react';
import { Modal } from 'react-bootstrap';

export default function ApplicantProfileModal({ applicant, onClose }) {
  if (!applicant) {
    return null;
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Applicant Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{applicant.firstName} {applicant.lastName}</h5>
        <p><strong>Email:</strong> {applicant.email}</p>
        <p><strong>Phone:</strong> {applicant.phoneNumber || 'N/A'}</p>
        <p><strong>Address:</strong> {applicant.address || 'N/A'}</p>
        <p><strong>LinkedIn:</strong> {applicant.linkedin ? (
          <a href={applicant.linkedin} target="_blank" rel="noopener noreferrer">
            {applicant.linkedin}
          </a>
        ) : 'N/A'}</p>
        <hr />
        <h4>Summary</h4>
        <p>{applicant.summary || 'N/A'}</p>
        <h4>Skills</h4>
        <p>{applicant.skills || 'N/A'}</p>
        
        {/* Education Section */}
        {applicant.education && applicant.education.length > 0 && (
          <>
            <hr />
            <h4>Education</h4>
            {applicant.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <p className="mb-0"><strong>School:</strong> {edu.school}</p>
                <p className="mb-0"><strong>Level:</strong> {edu.levelOfEducation}</p>
                <p className="mb-0"><strong>Field:</strong> {edu.fieldOfStudy}</p>
                <p className="mb-0"><strong>Graduation Year:</strong> {edu.yearOfGraduation}</p>
                {edu.description && <p className="text-muted small mt-1">{edu.description}</p>}
              </div>
            ))}
          </>
        )}
        
        {/* Experience Section */}
        {applicant.experience && applicant.experience.length > 0 && (
          <>
            <hr />
            <h4>Experience</h4>
            {applicant.experience.map((exp, index) => (
              <div key={index} className="mb-3">
                <p className="mb-0"><strong>Company:</strong> {exp.companyName}</p>
                <p className="mb-0"><strong>Role:</strong> {exp.role}</p>
                <p className="mb-0"><strong>Dates:</strong> {exp.startDate} - {exp.endDate || 'Present'}</p>
                {exp.description && <p className="text-muted small mt-1">{exp.description}</p>}
              </div>
            ))}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
