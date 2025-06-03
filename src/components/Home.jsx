import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/HomePage.css';

const featuredProperties = [
  {
    id: 1,
    name: 'Casablanca Villa',
    location: 'Igatpuri',
    price: 5000,
    description: 'A luxurious villa surrounded by nature, perfect for a weekend getaway. Enjoy the serene environment and modern amenities.',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/536133013.jpg?k=7d7f4652961177c8b59f5881eec09fe5d8aeeaea34abb7e5320668c085d4c240&o=&hp=1',
  },
  {
    id: 2,
    name: 'Royal Meadows',
    location: 'Gangapur',
    price: 7000,
    
    description: 'A serene getaway offering beautiful views and a relaxing atmosphere. Perfect for nature lovers and peace seekers.',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/293477715.jpg?k=241fb7298170c3a497eace7cae8002a70fc18d983dae5c537d7952c8260461f0&o=&hp=1',
  },
  {
    id: 3,
    name: 'Sunset Retreat',
    location: 'Nashik',
    price: 6500,
    description: 'A perfect retreat to enjoy stunning sunsets and cozy stays. Ideal for couples and small families and friends.',
    image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/536780409.jpg?k=9579bbfbc5c310202ea304799f0e0a3aa6a12472b387cd4ce9709366cea5d05e&o=&hp=1',
  },
];

const HomePage = () => {
  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Luxury Villas & Cottages</h1>
          <p>Find the perfect getaway for an unforgettable experience.</p>
          <Link to="/properties" className="explore-btn">Explore Now</Link>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="featured-properties">
        <h2>Featured Properties</h2>
        <div className="property-grid">
          {featuredProperties.map((property) => (
            <div className="property-card" key={property.id}>
              <div className="image-container">
                <img src={property.image} alt={property.name} />
              </div>
              <div className="card-content">
                <h3>{property.name}</h3>
                <p>{property.location}</p>
                <p className="price">₹{property.price}/night</p>
                <p>{property.description}</p>
                <Link to={`/villa/${property.id}`} className="book-btn">Book Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Your Dream Stay Awaits</h2>
        <p>Book now and enjoy exclusive offers on premium stays.</p>
        <Link to="/properties" className="cta-btn">Get Started</Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Cottage & Villa Bookings. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
