import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCamera, FaArrowLeft, FaSave } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const updatedUser = {
      ...user,
      name,
      email,
      profilePicture,
      password: password || user.password, // Keep the old password if no new password is provided
    };

    // Update the user in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = storedUsers.map(u => 
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update the user in the auth context
    updateUser(updatedUser);

    navigate('/admin-dashboard'); // Redirect back to the dashboard
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-outline-light mb-3" onClick={() => navigate('/admin-dashboard')}>
        <FaArrowLeft /> Back to Dashboard
      </button>
      <div className="card shadow-lg p-4"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          border: '1px solid #FFD700',
          color: 'white'
        }}>
        <h3 className="text-warning fw-bold mb-4">
          <FaCamera className="me-2" /> Edit Profile
        </h3>
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              id="profilePicture"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            <FaSave className="me-2" /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;