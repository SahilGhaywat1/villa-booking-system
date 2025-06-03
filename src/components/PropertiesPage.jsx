import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import '../styles/PropertiesPage.css';

const PropertiesPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [properties, setProperties] = useState(() => {
    const savedProperties = localStorage.getItem('propertiesData');
    return savedProperties ? JSON.parse(savedProperties) : [];
  });

  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [searchQuery, setSearchQuery] = useState('');

  const updateProperties = (newProperties) => {
    localStorage.setItem('propertiesData', JSON.stringify(newProperties));
    setProperties(newProperties);
  };

  const filteredProperties = properties
    .filter((property) => 
      (locationFilter ? property.location === locationFilter : true) &&
      (searchQuery ? 
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true)
    )
    .sort((a, b) => (sortBy === 'price' ? a.price - b.price : b.rating - a.rating));

  return (
    <div className="properties-page">
      <Navbar />
      <header className="properties-header">
        <h1>Discover Your Perfect Getaway</h1>
        <p>Explore our handpicked luxury villas and cottages for an unforgettable stay.</p>
      </header>
      
      <div className="filter-container">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search villas by name or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">All Locations</option>
            <option value="Igatpuri">Igatpuri</option>
            <option value="Gangapur">Gangapur</option>
            <option value="Nashik">Nashik</option>
            <option value="Trimbak">Trimbak</option>
          </select>
          
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price">Sort by Price (Low to High)</option>
            <option value="rating">Sort by Rating (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Rest of the code remains same */}
      <div className="properties-grid">
        {filteredProperties.map((property) => (
          <div className="property-card" key={property.id}>
            <img src={property.images} alt={property.name} className="property-image" />
            <div className="property-info">
              <h5>{property.name}</h5>
              <p className="property-location">⭐ {property.rating} {property.location}</p>
              <p className="property-price">₹{property.price}/night</p>
              <p className="property-description">{property.description}</p>
              <Link to={`/villa/${property.id}`} className="view-details-btn">View Details</Link>
            </div>
          </div>
        ))}
      </div>
      
      <footer className="footer">
        <p>&copy; 2025 Cottage & Villa Bookings. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PropertiesPage;