import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/SuccessPage.css";
import { useEffect } from "react";

const SuccessPage = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="success-page">
        <div className="success-container">
          <h1 className="success-title">🎉 Booking Confirmed!</h1>
          <p className="success-message">
            Your payment was successful. Get ready for an amazing stay! 🏡✨
          </p>
          <button className="home-button" onClick={() => navigate("/")}>
            Return to Home
          </button>
        </div>
      </div>

      <footer className="bg-black text-center text-light py-4">
          <p className="mb-0">&copy; 2025 Cottage & Villa Bookings. All rights reserved.</p>
        </footer>
    </>
  );
};

export default SuccessPage;
