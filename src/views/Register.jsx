import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, requestVerificationToken } from '../services/authService';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const registerData = await registerUser(formData);

      if (registerData.code === 201) {
        // Registration successful, now request the verification token.
        const verifyData = await requestVerificationToken(formData.username);

        if (verifyData.code === 200) {
          // Both registration and token request were successful.
          // Navigate to the verification page, passing the username.
          navigate('/verify-account', { state: { username: formData.username } });
        } else {
          throw new Error(verifyData.message || 'An error occurred while requesting verification.');
        }

      } else {
        // Handle backend errors from the registration endpoint.
        throw new Error(registerData.message || 'An error occurred during registration.');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ minHeight: '77vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Register for an Account</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password-input" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password-input"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              Already have an account? <Link to="/login">Log in here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
