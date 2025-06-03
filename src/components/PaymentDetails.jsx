import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const payment = JSON.parse(localStorage.getItem('payments')).find(p => p.id === Number(id));

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-header bg-warning text-dark">
          <h4 className="mb-0">Payment Invoice</h4>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <h5>User Details</h5>
              <p className="mb-1"><strong>Name:</strong> {payment.user?.name}</p>
              <p className="mb-1"><strong>Email:</strong> {payment.user?.email}</p>
            </div>
            <div className="col-md-6 text-end">
              <h5>Payment Details</h5>
              <p className="mb-1"><strong>Payment ID:</strong> #{payment.id}</p>
              <p className="mb-1"><strong>Date:</strong> {new Date(payment.timestamp).toLocaleString()}</p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <h5>Property Information</h5>
              <p className="mb-1"><strong>Villa Name:</strong> {payment.villaName}</p>
              <p className="mb-1"><strong>Check-in:</strong> {payment.checkIn}</p>
              <p className="mb-1"><strong>Check-out:</strong> {payment.checkOut}</p>
              <p className="mb-1"><strong>Guests:</strong> {payment.guests}</p>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <h5>Payment Breakdown</h5>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{payment.villaName} ({payment.checkIn} to {payment.checkOut})</td>
                      <td>₹{payment.totalPrice.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="text-end fw-bold">Total</td>
                      <td className="fw-bold">₹{payment.totalPrice.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h5>Payment Method Details</h5>
              {payment.paymentMethod === 'credit_card' || payment.paymentMethod === 'debit_card' ? (
                <div>
                  <p><strong>Card Number:</strong> **** **** **** {payment.paymentDetails.cardNumber.slice(-4)}</p>
                  <p><strong>Expiry Date:</strong> {payment.paymentDetails.expiryDate}</p>
                </div>
              ) : payment.paymentMethod === 'upi' ? (
                <p><strong>UPI ID:</strong> {payment.paymentDetails.upiId}</p>
              ) : (
                <p><strong>PayPal Email:</strong> {payment.paymentDetails.paypalEmail}</p>
              )}
            </div>
          </div>
        </div>
        <div className="card-footer text-end">
          <button className="btn btn-warning" onClick={() => window.print()}>
            Print Invoice
          </button>
          <button className="btn btn-outline-secondary ms-2" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;