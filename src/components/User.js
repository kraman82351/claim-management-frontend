import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function User() {
  const location = useLocation();
  const { emailId } = location.state || {};

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${emailId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [emailId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* User details */}
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title mb-4">User Details</h2>
              <div className="mb-3">
                <strong>Name:</strong> {userData.fullName}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {userData.emailId}
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
                <button className="btn btn-primary me-2">Add Insurance</button>
                <button className="btn btn-primary">Claim Insurance</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
