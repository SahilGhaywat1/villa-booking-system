import React, { useState, useEffect } from 'react';
import { FaBell, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNotifications = () => {
      const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
      setNotifications(storedNotifications);
    };
    loadNotifications();
    window.addEventListener('storage', loadNotifications);
    return () => window.removeEventListener('storage', loadNotifications);
  }, []);

  return (
    <div className="container mt-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-light" onClick={() => navigate('/admin-dashboard')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h3 className="text-warning fw-bold mb-0">
          <FaBell className="me-2" /> Notifications
        </h3>
      </div>

      <div className="card shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid #FFD700', borderRadius: '12px' }}>
        <div className="card-body p-0">
          <ul className="list-unstyled">
            {notifications.map((notification, index) => (
              <motion.li
                key={index}
                className="p-3 border-bottom border-warning"
                whileHover={{ scale: 1.02 }}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-light fw-normal">{notification.message}</span>
                  <small className="text-warning">{notification.timestamp}</small>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;