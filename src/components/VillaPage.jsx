import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/VillaPage.css';
import { useAuth } from '../context/AuthContext';
import { FaStar, FaSwimmingPool, FaWifi, FaParking, FaUmbrellaBeach } from 'react-icons/fa';
import { MdLocationPin, MdKingBed, MdAcUnit, MdRestaurant } from 'react-icons/md';
import { GiFireplace } from 'react-icons/gi';

const VillaPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [activeImage, setActiveImage] = useState(0);
  const [reviews, setReviews] = useState([
    { name: 'Majushree', rating: 4.8, review: 'Absolutely stunning property!' },
    { name: 'Priyanka', rating: 4.5, review: 'Great location and very peaceful!' }
  ]);
  const [userReview, setUserReview] = useState('');
  const [userRating, setUserRating] = useState(5);

  // Fetch propertiesData from localStorage
  const propertiesData = JSON.parse(localStorage.getItem('propertiesData')) || [];
  
  // Convert id from string to number
  const villaId = parseInt(id, 10);
  const villa = propertiesData.find((property) => property.id === villaId);

  if (!villa) return <h2>Villa not found</h2>;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Please login to submit a review.');
      navigate('/login');
      return;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const newReview = {
      name: user?.name || 'Anonymous',
      rating: userRating,
      review: userReview,
    };
    setReviews([...reviews, newReview]);
    setUserReview('');
    setUserRating(5);
  };

  const handleBookNow = () => {
    if (!isLoggedIn) {
      alert('Please login to book this villa.');
      navigate('/login');
    } else {
      navigate(`/payment/${id}`);
    }
  };

  const renderAmenityIcon = (amenity) => {
    const icons = {
      'Private Pool': <FaSwimmingPool />,
      'Free Wi-Fi': <FaWifi />,
      'Air Conditioning': <MdAcUnit />,
      'Parking': <FaParking />,
      'BBQ Area': <GiFireplace />,
      'Pet-Friendly': <MdKingBed />,
      'Spa': <FaUmbrellaBeach />
    };
    return icons[amenity] || <FaStar />;
  };

  return (
    <>
      <Navbar />
      <div className="villa-page">
        {/* Hero Section */}
        <div className="villa-hero">
          <div className="hero-content">
            <h1>{villa.name}</h1>
            <div className="hero-subtitle">
              <MdLocationPin /> {villa.location}
              <span className="rating"><FaStar /> {villa.rating}</span>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="gallery-container">
          <div className="main-image" style={{ backgroundImage: `url(${villa.images[activeImage]})` }}>
            <div className="image-nav">
              {villa.images.map((_, index) => (
                <button 
                  key={index}
                  className={index === activeImage ? 'active' : ''}
                  onClick={() => setActiveImage(index)}
                />
              ))}
            </div>
          </div>
          <div className="booking-card">
            <div className="price-section">
              <span className="price">₹{villa.price.toLocaleString()}</span>
              <span className="per-night">/ night</span>
            </div>
            <div className="booking-details">
              <div className="highlight">
                <div>
                  <h6><MdLocationPin />{villa.location}</h6>
                  <p>⭐Verified 5-star villa</p>
                  <p style={{ whiteSpace: "pre-line" }}>• {villa.amenities.join("\n• ")}</p>
                </div>
              </div>
              <button className="book-now-btn" onClick={handleBookNow}>
                Reserve Now
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="gallery-container">
          <div className="thumbnail-grid">
            {villa.images.map((img, index) => (
              <div 
                key={index}
                className={`thumbnail ${index === activeImage ? 'active' : ''}`}
                style={{ backgroundImage: `url(${img})` }}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="content-container">
          <section className="details-section">
            <h2>About this villa</h2>
            <p className="description">{villa.description}</p>
            
            <div className="features-grid">
              {villa.amenities.map((amenity, index) => (
                <div key={index} className="feature-item">
                  {renderAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Location Section */}
          <section className="location-section">
            <h2 style={{marginTop: '20px'}}>Location</h2>
            <div className="map-container">
              <div className="map-placeholder">
                <MdLocationPin className="pin-icon" />
                <span>{villa.gps}</span>
              </div>
            </div>
            <div className="attractions-grid">
              {villa.nearbyAttractions.map((attraction, index) => (
                <div key={index} className="attraction-card">
                  <div className="number">{index + 1}</div>
                  <h4>{attraction}</h4>
                  <p>15-45 min drive</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <div className="content-container">
          <h2 style={{ textAlign: 'center' }}>Guest Reviews</h2>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <h4>{review.name}</h4>
                <p className="review-rating">⭐ {review.rating}</p>
                <p className="review-text">"{review.review}"</p>
              </div>
            ))}
          </div>

          {isLoggedIn && (
            <form onSubmit={handleReviewSubmit} className="add-review-form">
              <h3>Write a Review</h3>
              <textarea value={userReview} onChange={(e) => setUserReview(e.target.value)} placeholder="Share your experience..." required />
              <select value={userRating} onChange={(e) => setUserRating(parseInt(e.target.value))}>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num} Stars</option>
                ))}
              </select>
              <button type="submit" className="submit-review-btn">Submit Review</button>
            </form>
          )}
        </div>
             
        </div>
        
        <footer className="bg-black text-center text-light py-4">
          <p className="mb-0">&copy; 2025 Cottage & Villa Bookings. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default VillaPage;