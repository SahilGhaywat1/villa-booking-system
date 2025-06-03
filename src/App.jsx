import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import PropertiesPage from './components/PropertiesPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import { AuthProvider } from './context/AuthContext';
import ContactUs from './components/ContactUs';
import VillaPage from './components/VillaPage';
import PaymentPage from './components/PaymentPage';
import SuccessPage from './components/SuccessPage';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ManageUsers';
import AdminRoute from './components/AdminRoute';
import ManageVillas from './components/ManageVillas';
import ManagePayments from './components/ManagePayments';
import PaymentDetails from './components/PaymentDetails';
import EditProfile from './components/EditProfile';
import Notifications from './components/Notifications';







function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/villa/:id" element={<VillaPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/admin/manage-villas" element={<ManageVillas />} />
        <Route path= "/admin/manage-payments" element= {<ManagePayments />}/>
        <Route path= "/admin/payment-details/:id" element= {<PaymentDetails />}/>
        <Route path= "/admin/profile" element= {<EditProfile />}/>
        <Route path="/admin/notifications" element={<Notifications />} />
        
    
       

        
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;