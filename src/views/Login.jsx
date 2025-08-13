import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../features/auth/authSlice';
import { loginUser } from '../services/authService';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: authError } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setError(null);

    try {
      const loginData = await loginUser(formData);

      if (loginData.code === 200) {
        dispatch(loginSuccess(loginData.payload));
        
        // Decode the token to get the user's role
        const decodedToken = jwtDecode(loginData.payload.token);
        
        // Redirect to the appropriate dashboard based on the user's role
        if (decodedToken.role === 'ROLE_ADMIN') {
          navigate('/admin/jobs');
        } else {
          navigate('/');
        }
      } else {
        throw new Error(loginData.message || 'An error occurred during login.');
      }
    } catch (e) {
      dispatch(loginFailure(e.message));
      setError(e.message);
    }
  };

  return (
    <div className="container mt-5" style={{ minHeight: '77vh' }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Login to Your Account</h3>
            </div>
            <div className="card-body">
              {(authError || error) && <div className="alert alert-danger">
                {authError || error}
              </div>}
              <form onSubmit={handleLogin}>
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
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              Don't have an account? <Link to="/register">Register here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
