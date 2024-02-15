import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';

function User() {
  // Sample user data
  
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St, City, Country'
  };

  const handleAddInsurance = () => {
    // Add insurance logic here
    console.log('Add Insurance button clicked');
  };

  const handleClaimInsurance = () => {
    // Claim insurance logic here
    console.log('Claim Insurance button clicked');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* User details */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title mb-4">User Details</h2>
              <div className="mb-3">
                <strong>Name:</strong> {userData.name}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {userData.email}
              </div>
              <div className="mb-3">
                <strong>Address:</strong> {userData.address}
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">History</h2>
              <div className="mb-4">
                <h4 className="mb-3">Insurance History</h4>
                {/* Display insurance history */}
                <ul className="list-group">
                  <li className="list-group-item">No insurance history available</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3">Claim History</h4>
                {/* Display claim history */}
                <ul className="list-group">
                  <li className="list-group-item">No claim history available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Buttons for adding and claiming insurance */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Insurance Actions</h2>
              <div className="mb-3">
                <button onClick={handleAddInsurance} className="btn btn-primary me-2">Add Insurance</button>
                <button onClick={handleClaimInsurance} className="btn btn-primary">Claim Insurance</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
