import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { propertiesData } from './propertiesData';
import { FaHome } from 'react-icons/fa';
import { addNotification } from '../utils/notifications'; // Import notification function

const ManageVillas = () => {
  const [villas, setVillas] = useState([]);
  const [editingVilla, setEditingVilla] = useState(null);
  const [addingVilla, setAddingVilla] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadProperties = () => {
      const savedProperties = JSON.parse(localStorage.getItem('propertiesData')) || propertiesData;
      setVillas(savedProperties.sort((a, b) => a.id - b.id));
    };
  
    loadProperties();
    window.addEventListener('storage', loadProperties);
    
    return () => window.removeEventListener('storage', loadProperties);
  }, []);
  
  const updateLocalStorage = (newData) => {
    newData.sort((a, b) => a.id - b.id);
    localStorage.setItem('propertiesData', JSON.stringify(newData));
    setVillas([...newData]);
  };

  const handleDelete = (id) => {
    const villaToDelete = villas.find(villa => villa.id === id);
    if (villaToDelete) {
      const updatedVillas = villas.filter((villa) => villa.id !== id);
      updateLocalStorage(updatedVillas);
      addNotification(`Villa deleted: ${villaToDelete.name}`); // Add delete notification
    }
  };

  const handleSave = (updatedVilla) => {
    let updatedVillas;
    const isUpdate = villas.some((villa) => villa.id === updatedVilla.id);
    
    if (isUpdate) {
      updatedVillas = villas.map((villa) => 
        villa.id === updatedVilla.id ? updatedVilla : villa
      );
      addNotification(`Villa updated: ${updatedVilla.name}`); // Update notification
    } else {
      const newId = villas.length > 0 ? Math.max(...villas.map(v => v.id)) + 1 : 1;
      updatedVilla.id = newId;
      updatedVillas = [...villas, updatedVilla];
      addNotification(`New villa added: ${updatedVilla.name}`); // Add notification
    }
    
    updateLocalStorage(updatedVillas);
    setEditingVilla(null);
    setAddingVilla(false);
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-outline-light" onClick={() => navigate('/admin-dashboard')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search villas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-warning" onClick={() => setAddingVilla(true)}>
          + Add New Villa
        </button>
      </div>
      <h3 className="text-warning fw-bold mb-3 text-center"><FaHome /> Manage Villas</h3>
      <table className="table table-dark table-hover text-center rounded shadow-lg">
        <thead className="bg-warning text-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {villas
            .filter((villa) => villa.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((villa) => (
              <tr key={villa.id}>
                <td>{villa.id}</td>
                <td>{villa.name}</td>
                <td>{villa.location}</td>
                <td>₹{villa.price}</td>
                <td>
                  <button className="btn btn-outline-warning btn-sm me-2" onClick={() => setEditingVilla(villa)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(villa.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {(editingVilla || addingVilla) && (
        <VillaForm 
          villa={editingVilla || { id: '', name: '', location: '', price: '', images: ['', '', ''], rating: 4.9, description: '', amenities: [], nearbyAttractions: [], gps: '' }}
          onSave={handleSave} 
          onCancel={() => { setEditingVilla(null); setAddingVilla(false); }}
        />
      )}
    </div>
  );
};

const VillaForm = ({ villa, onSave, onCancel }) => {
  const [formData, setFormData] = useState(villa);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "amenities" || name === "nearbyAttractions") {
      setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()) }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.7)' }}>
      <div className="modal-dialog">
        <div className="modal-content text-dark p-3 rounded">
          <h5 className="text-center mb-3 text-warning">{villa.id ? 'Edit Villa' : 'Add New Villa'}</h5>
          <form onSubmit={handleSubmit}>
            <label>ID</label>
            <input type="text" className="form-control mb-2" name="id" value={formData.id} onChange={handleChange} required />
            <label>Name</label>
            <input type="text" className="form-control mb-2" name="name" value={formData.name} onChange={handleChange} required />
            <label>Location</label>
            <input type="text" className="form-control mb-2" name="location" value={formData.location} onChange={handleChange} required />
            <label>Price</label>
            <input type="number" className="form-control mb-2" name="price" value={formData.price} onChange={handleChange} required />
            <label>Images (3 URLs)</label>
            {formData.images.map((img, index) => (
              <input key={index} type="text" className="form-control mb-2" value={img} onChange={(e) => handleImageChange(index, e.target.value)} required />
            ))}
            <label>Description</label>
            <textarea className="form-control mb-2" name="description" value={formData.description} onChange={handleChange} required></textarea>
            <label>Amenities (comma separated)</label>
            <input type="text" className="form-control mb-2" name="amenities" value={formData.amenities.join(',')} onChange={handleChange} required />
            <label>Nearby Attractions (comma separated)</label>
            <input type="text" className="form-control mb-2" name="nearbyAttractions" value={formData.nearbyAttractions.join(',')} onChange={handleChange} required />
            <label>GPS Coordinates</label>
            <input type="text" className="form-control mb-2" name="gps" value={formData.gps} onChange={handleChange} required />
            <button type="submit" className="btn btn-warning mt-3 w-100">Save</button>
            <button type="button" className="btn btn-secondary mt-2 w-100" onClick={onCancel}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageVillas;