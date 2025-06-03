import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    const foundUser = storedUsers.find(user => 
      user.email === email && 
      user.password === password && 
      user.role === role
    );

    if (foundUser) {
      login(foundUser);
      navigate(role === 'Admin' ? '/admin-dashboard' : '/');
    } else {
      setError('Invalid email, password, or role selection');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-black">
      <div className="card shadow-lg p-4" style={{ width: '400px', backgroundColor: '#111', borderRadius: '15px' }}>
        <h2 className="text-center mb-3" style={{ color: '#FFD700' }}>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-light">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-light"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ border: '1px solid #FFD700' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-light"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ border: '1px solid #FFD700' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Login as</label>
            <select
              className="form-control bg-dark text-light"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ border: '1px solid #FFD700' }}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: '#FFD700', color: '#000', fontWeight: 'bold' }}>Login</button>
        </form>
        <p className="text-center mt-3 text-light">
          Don't have an account? <Link to="/signup" style={{ color: '#FFD700' }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
