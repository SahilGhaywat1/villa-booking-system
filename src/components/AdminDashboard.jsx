import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUserCog, FaHome, FaMoneyBillWave, FaUser, FaSignOutAlt, 
  FaChartLine, FaCogs, FaBell 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [villas, setVillas] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      setUsers(JSON.parse(localStorage.getItem('users')) || []);
      setVillas(JSON.parse(localStorage.getItem('propertiesData')) || []);
      setPayments(JSON.parse(localStorage.getItem('payments')) || []);
      setNotifications(JSON.parse(localStorage.getItem('notifications')) || []);
    };
    
    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatNumber = (num) => num.toLocaleString();

  return (
    <div className="d-flex" style={{ height: '95vh', backgroundColor: '#0D1117' }}>
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="d-flex flex-column p-3 text-white shadow-lg"
        style={{
          width: '260px',
          background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
          borderRight: '3px solid #FFD700',
          boxShadow: '5px 0 15px rgba(255, 215, 0, 0.4)',
          borderRadius: '0px 15px 15px 0px'
        }}>
        <h4 className="text-center text-warning fw-bold mb-3">
          <FaCogs className="me-2" /> Admin Panel
        </h4>
        <ul className="nav flex-column">
          {[
            { path: '/admin/manage-users', icon: <FaUser />, label: 'Users' },
            { path: '/admin/manage-villas', icon: <FaHome />, label: 'Villas' },
            { path: '/admin/manage-payments', icon: <FaMoneyBillWave />, label: 'Payments' },
            { path: '/admin/profile', icon: <FaUserCog />, label: 'Profile' },
            { path: '/admin/notifications', icon: <FaBell />, label: 'Notifications' }
          ].map((item, index) => (
            <motion.li key={index} className="nav-item mb-2" whileHover={{ scale: 1.05 }}>
              <Link to={item.path} className="nav-link d-flex align-items-center p-2"
                style={{
                  borderRadius: '10px',
                  transition: '0.3s',
                  color: 'white',
                  fontWeight: 'bold',
                  background: 'rgba(255, 255, 255, 0.15)',
                }}>
                <span className="me-2 text-warning" style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                {item.label}
              </Link>
            </motion.li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleLogout}
          className="btn btn-warning w-100 mt-auto fw-bold py-2 d-flex align-items-center justify-content-center"
          style={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(255, 215, 0, 0.3)' }}>
          <FaSignOutAlt className="me-2" /> Logout
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-grow-1 p-3 text-white"
        style={{ background: 'linear-gradient(135deg, #111827 0%, #1E293B 100%)', borderRadius: '15px' }}>

        {/* Admin Profile */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-warning fw-bold mb-0">
            <FaChartLine className="me-2" /> Dashboard Overview
          </h3>
          <div className="d-flex align-items-center ms-auto">
          <Link to="/admin/notifications" className="d-flex align-items-center me-3"style={{ textDecoration: 'none' }}>
  <FaBell className="text-warning" style={{ fontSize: '1.3rem', cursor: 'pointer',transition: 'transform 0.3s ease'}}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}/></Link>
            <div className="dropdown">
              <motion.img
                src={user?.profilePicture || 'https://randomuser.me/api/portraits/men/32.jpg'}
                alt="Admin"
                className="rounded-circle me-2 border border-warning shadow-sm"
                whileHover={{ scale: 1.15 }}
                style={{ width: '45px', height: '45px', cursor: 'pointer' }}
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                <li><Link className="dropdown-item" to="/admin/profile">Edit Profile</Link></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
            <span className="text-warning fw-bold fs-6">
              {user?.name || 'Admin'}
            </span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="row mt-4">
          {[
            { 
              title: 'Total Users', 
              value: formatNumber(users.length), 
              icon: <FaUser className="fs-3 text-warning" />, 
              bg: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' 
            },
            { 
              title: 'Total Villas', 
              value: formatNumber(villas.length), 
              icon: <FaHome className="fs-3 text-warning" />, 
              bg: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' 
            },
            { 
              title: 'Total Earnings', 
              value: `₹${formatNumber(payments.reduce((sum, payment) => sum + payment.totalPrice, 0))}`, 
              icon: <FaMoneyBillWave className="fs-3 text-warning" />, 
              bg: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)' 
            }
          ].map((card, index) => (
            <motion.div key={index} className="col-md-4 mb-3" whileHover={{ scale: 1.05 }}>
              <div className="card text-center p-3 shadow-lg"
                style={{
                  background: card.bg,
                  color: 'white',
                  borderRadius: '12px',
                  border: '1px solid #FFD700',
                  minHeight: '120px',
                }}>
                <div className="mb-2">{card.icon}</div>
                <h5 className="fw-bold mb-1">{card.title}</h5>
                <h3 className="fw-bold">{card.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="mt-4">
  <h5 className="text-warning fw-bold mb-3">
    <FaBell className="me-2" /> Recent Activities
  </h5>
  <div className="card p-3 shadow-lg"
    style={{
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      border: '1px solid #FFD700',
      color: 'white',
      maxHeight: '300px', // Fixed height
      overflowY: 'auto' // Enable vertical scrolling
    }}>
    <ul className="list-unstyled">
      {notifications
        .slice(0, 5) // Show only first 5 notifications
        .map((notification, index) => (
          <motion.li 
            key={index} 
            className="mb-2 d-flex justify-content-between align-items-center"
            whileHover={{ x: 8 }}
          >
            <span className="text-light fw-normal">{notification.message}</span>
            <small className="text-warning">{notification.timestamp}</small>
          </motion.li>
      ))}
    </ul>
  </div>
</div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;