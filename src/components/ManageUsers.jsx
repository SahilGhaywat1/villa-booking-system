import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { addNotification } from '../utils/notifications';

const ManageUsers = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User'
  });

  // Load users from localStorage
  useEffect(() => {
    const loadUsers = () => {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      setUsers(storedUsers);
    };
    loadUsers();
    window.addEventListener('storage', loadUsers);
    return () => window.removeEventListener('storage', loadUsers);
  }, []);

  const handleDelete = (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.email !== email);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      addNotification(`User ${email} deleted`);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    const updatedUsers = users.map(user =>
      user.email === editingUser.email ? editingUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setEditingUser(null);
    addNotification(`User ${editingUser.email} updated`);
  };

  const handleCreateUser = () => {
    const existingUser = users.find(user => user.email === newUser.email);
    if (existingUser) {
      alert('User with this email already exists!');
      return;
    }
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setNewUser({ name: '', email: '', password: '', role: 'User' });
    addNotification(`New user ${newUser.name} created`);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin()) {
    return <div>Unauthorized Access</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 text-white"
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
         {/* Back to Dashboard Button */}
         <button className="btn btn-outline-light" onClick={() => navigate('/admin-dashboard')}>
            <FaArrowLeft /> Back to Dashboard
          </button>
        <h3 className="text-warning fw-bold mb-3 text-center"><FaUser className="me-2" />Manage Users</h3>
        <div className="d-flex align-items-center">
          <div className="input-group me-3" style={{ width: '300px' }}>
            <span className="input-group-text bg-dark text-warning border-warning">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control bg-dark text-warning border-warning"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />  
          </div>
          <button
            className="btn btn-warning me-2"
            onClick={() => document.getElementById('createModal').showModal()}
          >
            <FaPlus className="me-2" />Add User
          </button>
         
        </div>
      </div>

      {/* Create User Modal */}
      <dialog 
  id="createModal" 
  className="rounded-lg" 
  style={{ 
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    border: 'none',
    backdropFilter: 'blur(5px)',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999
  }}
>
  <motion.div
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    className="rounded-lg position-absolute top-50 start-50 translate-middle"
    style={{
      width: '500px',
      maxWidth: '90%',
      background: 'linear-gradient(145deg, #1F2937 0%, #111827 100%)',
      border: '2px solid #FFD700',
      boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
    }}
    onClick={(e) => e.stopPropagation()}
  >
    <div className="p-4">
      <h4 className="text-center mb-4" style={{
        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '700'
      }}>
        Create New User
      </h4>

      <div className="mb-4">
        <label className="d-block mb-2" style={{ color: '#FFD700', fontWeight: '500' }}>Name</label>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#1F2937',
            border: '2px solid #FFD700',
            borderRadius: '8px',
            color: '#FFD700',
            transition: 'all 0.3s ease'
          }}
        />
      </div>

      <div className="mb-4">
        <label className="d-block mb-2" style={{ color: '#FFD700', fontWeight: '500' }}>Email</label>
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#1F2937',
            border: '2px solid #FFD700',
            borderRadius: '8px',
            color: '#FFD700',
            transition: 'all 0.3s ease'
          }}
        />
      </div>

      <div className="mb-4">
        <label className="d-block mb-2" style={{ color: '#FFD700', fontWeight: '500' }}>Password</label>
        <input
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#1F2937',
            border: '2px solid #FFD700',
            borderRadius: '8px',
            color: '#FFD700',
            transition: 'all 0.3s ease'
          }}
        />
      </div>

      <div className="mb-4">
        <label className="d-block mb-2" style={{ color: '#FFD700', fontWeight: '500' }}>Role</label>
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#1F2937',
            border: '2px solid #FFD700',
            borderRadius: '8px',
            color: '#FFD700',
            cursor: 'pointer',
            appearance: 'none',
            transition: 'all 0.3s ease'
          }}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="d-flex justify-content-end gap-3 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="btn"
          onClick={() => document.getElementById('createModal').close()}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'rgba(255, 215, 0, 0.1)',
            border: '2px solid #FFD700',
            borderRadius: '8px',
            color: '#FFD700',
            fontWeight: '600'
          }}
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="btn"
          onClick={handleCreateUser}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
            border: 'none',
            borderRadius: '8px',
            color: '#000',
            fontWeight: '600'
          }}
        >
          Create User
        </motion.button>
      </div>
    </div>
  </motion.div>
</dialog>

      {/* Edit User Modal */}
      {editingUser && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed-top d-flex align-items-center justify-content-center"
    style={{
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      zIndex: 9999
    }}
    onClick={() => setEditingUser(null)}
  >
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className="rounded-lg"
      style={{
        width: '500px',
        maxWidth: '90%',
        background: 'linear-gradient(145deg, #1F2937 0%, #111827 100%)',
        border: '2px solid #FFD700',
        boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4">
        <h4 className="text-center mb-4" style={{
          background: 'linear-gradient(45deg, #FFD700, #FFA500)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '700'
        }}>
          Edit User
        </h4>

        <div className="mb-4">
          <label className="d-block mb-2" style={{ color: '#FFD700', fontWeight: '500' }}>
            Name
          </label>
          <input
            type="text"
            value={editingUser.name}
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1F2937',
              border: '2px solid #FFD700',
              borderRadius: '8px',
              color: '#FFD700',
              transition: 'all 0.3s ease'
            }}
          />
        </div>

        <div className="mb-4">
          <label className="d-block mb-2" style={{ color: '#FFD700', fontWeight: '500' }}>
            Email
          </label>
          <input
            type="email"
            value={editingUser.email}
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1F2937',
              border: '2px solid #FFD700',
              borderRadius: '8px',
              color: '#FFD700',
              transition: 'all 0.3s ease'
            }}
          />
        </div>

        <div className="mb-4">
          <label className="d-block mb-2" style={{ color: '#FFD700', fontWeight: '500' }}>
            Role
          </label>
          <select
            value={editingUser.role}
            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#1F2937',
              border: '2px solid #FFD700',
              borderRadius: '8px',
              color: '#FFD700',
              cursor: 'pointer',
              appearance: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="d-flex justify-content-end gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn"
            onClick={() => setEditingUser(null)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgba(255, 215, 0, 0.1)',
              border: '2px solid #FFD700',
              borderRadius: '8px',
              color: '#FFD700',
              fontWeight: '600'
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn"
            onClick={handleUpdateUser}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              fontWeight: '600'
            }}
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </motion.div>
  </motion.div>
)}

      <div className="table-responsive">
        <table className="table table-dark table-hover border-warning">
          <thead>
            <tr>
              <th className="text-warning">Name</th>
              <th className="text-warning">Email</th>
              <th className="text-warning">Role</th>
              <th className="text-warning">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === 'Admin' ? 'bg-warning text-dark' : 'bg-secondary'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(user.email)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageUsers;