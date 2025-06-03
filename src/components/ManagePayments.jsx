import React from 'react';
import { FaMoneyBillWave, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ManagePayments = () => {
  const [payments, setPayments] = React.useState(() => {
    return JSON.parse(localStorage.getItem('payments')) || [];
  });
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();

  const filteredPayments = payments.filter(payment =>
    payment.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.villaName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-outline-light" onClick={() => navigate('/admin-dashboard')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <div className="input-group w-50">
          <input
            type="text"
            className="form-control"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="input-group-text">
            <FaSearch />
          </span>
        </div>
      </div>

      <h3 className="text-warning fw-bold mb-3 text-center">
        <FaMoneyBillWave className="me-2" /> Payment Transactions
      </h3>

      <div className="card shadow-lg">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0">
              <thead className="bg-warning text-dark">
                <tr>
                  <th>Payment ID</th>
                  <th>User</th>
                  <th>Villa</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td>#{payment.id}</td>
                    <td>{payment.user?.name || 'Guest'}</td>
                    <td>{payment.villaName}</td>
                    <td>₹{payment.totalPrice.toLocaleString()}</td>
                    <td>{payment.paymentMethod.replace('_', ' ').toUpperCase()}</td>
                    <td>{new Date(payment.timestamp).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-outline-warning btn-sm"
                        onClick={() => navigate(`/admin/payment-details/${payment.id}`)}
                      >
                        View Bill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePayments;