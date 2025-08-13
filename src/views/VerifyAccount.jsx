import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function VerifyAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  // Extract the username from the navigation state
  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
      setMessage(`A verification token has been sent to ${location.state.username}.`);
    } else {
      setMessage('Please register or request a new verification token to proceed.');
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    setToken(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/auth/verify-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, token })
      });

      const data = await response.json();

      if (response.ok && data.code === 200) {
        navigate('/login', { state: { message: 'Account verified successfully. You can now log in.' } });
      } else {
        throw new Error(data.message || 'Verification failed.');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Verify Your Account</h3>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              <p>Please check your email for the verification token.</p>
              <form onSubmit={handleVerify}>
                <div className="mb-3">
                  <label htmlFor="token" className="form-label">Verification Token</label>
                  <input
                    type="text"
                    className="form-control"
                    id="token"
                    name="token"
                    value={token}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify Account'}
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              Didn't receive a token? <Link to="/register">Resend</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
