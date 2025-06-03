import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/PaymentPage.css';
import { addNotification } from '../utils/notifications';

const PaymentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const propertiesData = JSON.parse(localStorage.getItem('propertiesData')) || [];
  const villa = propertiesData.find((property) => property.id === parseInt(id));

  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalPrice, setTotalPrice] = useState(villa.price);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    paypalEmail: '',
  });
  const [errors, setErrors] = useState({});

  const calculateTotalPrice = (checkInDate, checkOutDate) => {
    if (!checkInDate || !checkOutDate) return villa.price;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const timeDifference = endDate - startDate;
    const numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    if (numberOfNights < 1) return villa.price;
    return villa.price * numberOfNights;
  };

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    setTotalPrice(calculateTotalPrice(newCheckIn, checkOut));
  };

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;
    setCheckOut(newCheckOut);
    setTotalPrice(calculateTotalPrice(checkIn, newCheckOut));
  };

  const validateCardNumber = (cardNumber) => {
    cardNumber = cardNumber.replace(/\D/g, '');
    if (!/^\d{13,19}$/.test(cardNumber)) return false;
    let sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
      let digit = parseInt(cardNumber.charAt(i), 10);
      if ((cardNumber.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  const validateExpiryDate = (expiryDate) => {
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    return (
      /^\d{2}\/\d{2}$/.test(expiryDate) &&
      year >= currentYear &&
      (year > currentYear || month >= currentMonth)
    );
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const validateUPI = (upiId) => {
    return /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(upiId);
  };

  const validatePayPalEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });

    const newErrors = { ...errors };
    switch (name) {
      case 'cardNumber':
        newErrors.cardNumber = validateCardNumber(value) ? '' : 'Invalid card number.';
        break;
      case 'expiryDate':
        newErrors.expiryDate = validateExpiryDate(value) ? '' : 'Invalid expiry date.';
        break;
      case 'cvv':
        newErrors.cvv = validateCVV(value) ? '' : 'Invalid CVV.';
        break;
      case 'upiId':
        newErrors.upiId = validateUPI(value) ? '' : 'Invalid UPI ID.';
        break;
      case 'paypalEmail':
        newErrors.paypalEmail = validatePayPalEmail(value) ? '' : 'Invalid PayPal email.';
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setPaymentDetails({ ...paymentDetails, expiryDate: value });
    handlePaymentDetailsChange({ target: { name: 'expiryDate', value } });
  };

  const handlePayment = () => {
    if (!checkIn || !checkOut || !paymentMethod) {
      alert('Please fill all details before proceeding.');
      return;
    }

    const newErrors = {};
    if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
      if (!validateCardNumber(paymentDetails.cardNumber)) {
        newErrors.cardNumber = 'Invalid card number.';
      }
      if (!validateExpiryDate(paymentDetails.expiryDate)) {
        newErrors.expiryDate = 'Invalid expiry date.';
      }
      if (!validateCVV(paymentDetails.cvv)) {
        newErrors.cvv = 'Invalid CVV.';
      }
    } else if (paymentMethod === 'upi') {
      if (!validateUPI(paymentDetails.upiId)) {
        newErrors.upiId = 'Invalid UPI ID.';
      }
    } else if (paymentMethod === 'paypal') {
      if (!validatePayPalEmail(paymentDetails.paypalEmail)) {
        newErrors.paypalEmail = 'Invalid PayPal email.';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save payment details to localStorage
    const payment = {
      id: Date.now(), // Unique ID for the payment
      villaId: villa.id,
      villaName: villa.name,
      user: JSON.parse(localStorage.getItem('user')), // Assuming user data is stored in localStorage
      checkIn,
      checkOut,
      guests,
      totalPrice,
      paymentMethod,
      paymentDetails,
      timestamp: new Date().toISOString(),
    };

    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    payments.push(payment);
    localStorage.setItem('payments', JSON.stringify(payments));

    // Add both notifications
    addNotification(`Payment received for ${villa.name} - ₹${totalPrice.toLocaleString('en-IN')}`);
    addNotification(`Booking confirmed for ${villa.name} (${new Date(checkIn).toLocaleDateString()} to ${new Date(checkOut).toLocaleDateString()})`);

    alert(`Payment successful for ${villa.name}!`);
    navigate('/success');
  };

  if (!villa) return <h2>Villa not found</h2>;

  return (
    <>
      <Navbar />
      <div className="payment-page">
        <div className="payment-container">
          <h1 className="payment-header">Confirm Your Booking</h1>
          <div
            className="villa-image"
            style={{ backgroundImage: `url(${villa.images[0]})` }}
          ></div>
          <h2 className="villa-name">{villa.name}</h2>
          <p className="villa-description">{villa.description}</p>
          <p className="villa-price">
            <strong>Price:</strong> ₹{totalPrice} ({villa.price}/night)
          </p>

          <div className="form-group">
            <label>Number of Guests:</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Check-in Date:</label>
            <input
              type="date"
              value={checkIn}
              onChange={handleCheckInChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Check-out Date:</label>
            <input
              type="date"
              value={checkOut}
              onChange={handleCheckOutChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Select Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-input"
            >
              <option value="">Choose...</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="upi">UPI</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {paymentMethod === 'credit_card' || paymentMethod === 'debit_card' ? (
            <div className="payment-details">
              <div className="form-group">
                <label>Card Number:</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handlePaymentDetailsChange}
                  className="form-input"
                  placeholder="1234 5678 9012 3456"
                />
                {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
              </div>
              <div className="form-group">
                <label>Expiry Date:</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleExpiryDateChange}
                  className="form-input"
                  placeholder="MM/YY"
                  maxLength={5}
                />
                {errors.expiryDate && <p className="error">{errors.expiryDate}</p>}
              </div>
              <div className="form-group">
                <label>CVV:</label>
                <input
                  type="password"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handlePaymentDetailsChange}
                  className="form-input"
                  placeholder="123"
                  maxLength={4}
                />
                {errors.cvv && <p className="error">{errors.cvv}</p>}
              </div>
            </div>
          ) : paymentMethod === 'upi' ? (
            <div className="payment-details">
              <div className="form-group">
                <label>UPI ID:</label>
                <input
                  type="text"
                  name="upiId"
                  value={paymentDetails.upiId}
                  onChange={handlePaymentDetailsChange}
                  className="form-input"
                  placeholder="username@bank"
                />
                {errors.upiId && <p className="error">{errors.upiId}</p>}
              </div>
            </div>
          ) : paymentMethod === 'paypal' ? (
            <div className="payment-details">
              <div className="form-group">
                <label>PayPal Email:</label>
                <input
                  type="email"
                  name="paypalEmail"
                  value={paymentDetails.paypalEmail}
                  onChange={handlePaymentDetailsChange}
                  className="form-input"
                  placeholder="example@paypal.com"
                />
                {errors.paypalEmail && <p className="error">{errors.paypalEmail}</p>}
              </div>
            </div>
          ) : null}

          <button className="pay-btn" onClick={handlePayment}>
            Proceed to Pay
          </button>
        </div>
      </div>
      <footer>
        <p>&copy; 2025 Cottage & Villa Bookings. All rights reserved.</p>
      </footer>
    </>
  );
};

export default PaymentPage;