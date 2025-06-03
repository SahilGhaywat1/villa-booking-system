import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('User'); // Default role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Get existing users or create empty array
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    const userExists = existingUsers.some(user => user.email === email);
    if (userExists) {
      setError('User already exists with this email');
      return;
    }

    const newUser = { name, email, password, role };
    const updatedUsers = [...existingUsers, newUser];
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    navigate('/login');
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#000' }}>
      <div 
        className="card shadow-lg p-4 position-relative" 
        style={{ 
          width: '400px', 
          backgroundColor: '#111', 
          borderRadius: '10px', 
          color: '#FFD700', 
          border: '1px solid #FFD700', 
          boxShadow: '0px 0px 15px rgba(255, 215, 0, 0.6)'
        }}
      >
        <button 
          className="position-absolute top-0 end-0 m-2 btn-close" 
          style={{ filter: 'invert(1)' }}
          onClick={() => navigate('/')}
        ></button>
        <h2 className="text-center mb-3" style={{ color: '#FFD700' }}>Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ backgroundColor: '#222', color: '#FFD700', border: '1px solid #FFD700' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ backgroundColor: '#222', color: '#FFD700', border: '1px solid #FFD700' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ backgroundColor: '#222', color: '#FFD700', border: '1px solid #FFD700' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ backgroundColor: '#222', color: '#FFD700', border: '1px solid #FFD700' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Sign up as</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ backgroundColor: '#222', color: '#FFD700', border: '1px solid #FFD700' }}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn w-100" style={{ backgroundColor: '#FFD700', color: '#000', fontWeight: 'bold' }}>Sign Up</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login" style={{ color: '#FFD700' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
