import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const ContactUs = () => {
  return (
    <div style={{ backgroundColor: '#121212', color: '#e0e0e0', fontFamily: 'Poppins, sans-serif', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="text-white text-center d-flex align-items-center justify-content-center position-relative" 
        style={{
          background: "url('https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600&auto=format&fit=crop') no-repeat center center/cover",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)"
        }}></div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFD700', textShadow: '3px 3px 8px rgba(0, 0, 0, 0.8)', position: "relative", zIndex: 1 }}
        >
          Get in Touch
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{ fontSize: '1.2rem', maxWidth: '600px', fontWeight: '500', textAlign: 'center', color: '#f1f1f1', textShadow: '2px 2px 6px rgba(0, 0, 0, 0.8)', position: "relative", zIndex: 1 }}
        >
          We’d love to hear from you! Reach out for inquiries, bookings, or any assistance.
        </motion.p>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section className="py-5" initial="hidden" animate="visible" variants={fadeInUp}>
        <div className="container">
          <h2 className="text-center mb-4" style={{ color: '#FFD700', fontWeight: 'bold' }}>Send Us a Message</h2>
          <motion.form className="mx-auto p-4"
            style={{
              maxWidth: '500px',
              backgroundColor: '#1f1f1f',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 10px rgba(255, 215, 0, 0.2)',
              border: '1px solid #333'
            }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div className="mb-3" variants={fadeInUp}>
              <input type="text" className="form-control" placeholder="Your Name" required style={{ backgroundColor: '#FFFFFF', color: '#121212', border: '1px solid #444', padding: '10px', borderRadius: '6px' }} />
            </motion.div>
            <motion.div className="mb-3" variants={fadeInUp}>
              <input type="email" className="form-control" placeholder="Your Email" required style={{ backgroundColor: '#FFFFFF', color: '#121212', border: '1px solid #444', padding: '10px', borderRadius: '6px' }} />
            </motion.div>
            <motion.div className="mb-3" variants={fadeInUp}>
              <textarea className="form-control" rows="4" placeholder="Your Message" required style={{ backgroundColor: '#FFFFFF', color: '#121212', border: '1px solid #444', padding: '10px', borderRadius: '6px' }}></textarea>
            </motion.div>
            <motion.button type="submit" className="w-100" 
              style={{
                backgroundColor: '#FFD700',
                color: '#121212',
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out'
              }}
              whileHover={{ scale: 1.05 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer className="bg-black text-center text-light py-4" initial="hidden" animate="visible" variants={fadeInUp}>
        <p className="mb-0">&copy; 2025 Cottage & Villa Bookings. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default ContactUs;