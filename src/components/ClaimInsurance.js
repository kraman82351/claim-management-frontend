import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function ClaimInsurance() {
  const [formData, setFormData] = useState({
    insuranceId: '',
    claimReason: '',
    claimAmount: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic to handle claim submission here
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Claim Insurance</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="insuranceId" className="form-label">Insurance ID:</label>
              <input 
                type="text" 
                id="insuranceId" 
                name="insuranceId" 
                value={formData.insuranceId} 
                onChange={handleInputChange} 
                className="form-control" 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="claimReason" className="form-label">Claim Reason:</label>
              <textarea 
                id="claimReason" 
                name="claimReason" 
                value={formData.claimReason} 
                onChange={handleInputChange} 
                className="form-control" 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="claimAmount" className="form-label">Claim Amount:</label>
              <input 
                type="text" 
                id="claimAmount" 
                name="claimAmount" 
                value={formData.claimAmount} 
                onChange={handleInputChange} 
                className="form-control" 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Request Claim</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClaimInsurance;

