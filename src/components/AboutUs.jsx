import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const AboutUs = () => {
  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #0d0d0d 0%,rgb(39, 37, 37) 50%, #121212 100%)',
      color: '#e0e0e0',
      fontFamily: 'Poppins, sans-serif',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      <Navbar />

      {/* Hero Section with Animated Background */}
      <motion.section 
        className="about-hero text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: "url('https://images.unsplash.com/photo-1511909022865-a30191182d6d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D') no-repeat center center/cover",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textShadow: "0px 0px 15px rgba(255, 215, 0, 0.3)",
          position: 'relative'
        }}
      >
        <motion.h1 
          style={{ fontSize: '3rem',
            fontWeight: 'bold',
            color: '#FFD700', // Bright Gold Text
            textShadow: '3px 3px 8px rgba(0, 0, 0, 0.8)', // Stronger text shadow for better visibility
            position: "relative",
            zIndex: 1 }}
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h1>
        <motion.p 
          style={{ fontSize: '1.3rem', maxWidth: '600px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Experience luxury and comfort with our premium cottages and villas.
        </motion.p>
      </motion.section>

      {/* Who We Are Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <motion.h2 style={{ color: '#FFD700', fontWeight: 'bold' }} whileHover={{ scale: 1.1 }}>
              Who We Are
            </motion.h2>
            <p style={{ color: '#b0b0b0', background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
            At VillaScape, we specialize in providing premium villa bookings and seamless cottage management services. 
            Whether you're looking for a luxurious retreat or a cozy countryside stay, 
            we offer handpicked properties in scenic locations like Nashik, Trimbak, Igatpuri, and Gangapur. 
            Our goal is to create unforgettable stays with top-tier hospitality, modern amenities, and hassle-free booking. 
            Experience comfort, elegance, and nature—all in one place with VillaScape.
            </p>
          </div>
          <div className="col-md-6">
            <motion.img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Who We Are"
              style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 10px rgba(255, 215, 0, 0.5)' }}
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 order-md-2">
            <motion.h2 style={{ color: '#FFD700', fontWeight: 'bold' }} whileHover={{ scale: 1.1 }}>
              Our Mission
            </motion.h2>
            <p style={{ color: '#b0b0b0', background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: '12px', backdropFilter: 'blur(10px)' }}>
              To redefine luxury stays by offering a blend of elegance, nature, and modern amenities.
              We ensure every guest enjoys a personalized, comfortable, and memorable experience.
              At VillaScape, our mission is to redefine luxury and comfort in villa stays by offering a 
              seamless booking experience and top-tier property management.
              We strive to connect travelers with exquisite villas and cottages that provide a perfect blend of 
              nature, elegance, and relaxation. With a commitment to excellence, personalized service, and hassle-free stays, 
              we aim to make every getaway memorable and stress-free.
            </p>
          </div>
          <div className="col-md-6 order-md-1">
            <motion.img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Mission"
              style={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 10px rgba(255, 215, 0, 0.5)' }}
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </div>
      </section>

      {/* Footer with Floating Effect */}
      <footer className="bg-black text-center text-light py-4" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p className="mb-0" animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}>
          &copy; 2025 Cottage & Villa Bookings. All rights reserved.
        </motion.p>
      </footer>
    </div>
  );
};

export default AboutUs;
