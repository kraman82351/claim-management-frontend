import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddPolicy() {
  const [policyData, setPolicyData] = useState({
    policyNumber: '',
    policyType: '',
    coverageAmount: '',
    premium: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicyData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to add the policy
      await axios.post('http://localhost:3000/admin/add_policy', policyData);
      // Navigate back to the admin route upon successful addition
      navigate('/admin');
    } catch (error) {
      console.error('Error adding policy:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Policy</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="policyNumber" className="form-label">Policy Number</label>
          <input type="text" className="form-control" id="policyNumber" name="policyNumber" value={policyData.policyNumber} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="policyType" className="form-label">Policy Type</label>
          <input type="text" className="form-control" id="policyType" name="policyType" value={policyData.policyType} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="coverageAmount" className="form-label">Coverage Amount</label>
          <input type="text" className="form-control" id="coverageAmount" name="coverageAmount" value={policyData.coverageAmount} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="premium" className="form-label">Premium</label>
          <input type="text" className="form-control" id="premium" name="premium" value={policyData.premium} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Policy</button>
        <Link to="/admin" className="btn btn-secondary ms-2">Cancel</Link>
      </form>
    </div>
  );
}

export default AddPolicy;
