import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';

function User() {
  const location = useLocation();
  const navigate = useNavigate();
  const { emailId, userId } = location.state || {};

  const [userData, setUserData] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInsuranceHistory, setShowInsuranceHistory] = useState(false);
  const [showClaimHistory, setShowClaimHistory] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://bff-ymzy.onrender.com/user/${emailId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [emailId]);

  const handleAddInsurance = () => {
    // Add insurance logic here
    navigate('/home/addInsurance', { state: { userId: userData.userId, emailId: emailId } });
  };

  const handleClaimInsurance = () => {
    // Claim insurance logic here
    navigate('/home/claiminsurance', { state: { userId: userData.userId, emailId: emailId } });
  };

  const handleViewInsuranceHistory = async () => {
    setShowInsuranceHistory(!showInsuranceHistory);
    if (!showInsuranceHistory) {
      try {
        const policiesResponse = await axios.get(`https://bff-ymzy.onrender.com/user/policies/${userId}`);
        setPolicies(policiesResponse.data);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    }
  };

  const handleViewClaimHistory = async () => {
    setShowClaimHistory(!showClaimHistory);
    if (!showClaimHistory) {
      try {
        const claimsResponse = await axios.get(`https://bff-ymzy.onrender.com/user/claims/${userId}`);
        setClaims(claimsResponse.data);
      } catch (error) {
        console.error('Error fetching claims:', error);
      }
    }
  };

  const handleLogout = () => {
    // Logic for logout, navigate to root route
    navigate('/');
  };

  if (loading) {
    return <div>Loading...<Toaster/></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
 
  return (
   
    <div className="container mt-2 text-center">
      <nav className="navbar navbar-expand-lg " style={{ backgroundColor: `#265073` }} >
        <div className="container-fluid">
          <h3 className="navbar-brand font-weight-bold" style={{ color: 'white' }}>Claim Management System</h3>
              <button onClick={handleLogout} className="btn btn-danger" type="button">Logout</button>
        </div>
      </nav>
      <div className="row mb-4 mt-4">
        {/* User details */}
        <div className="col-md-6" >
          <div className="card" style={{ backgroundColor: `#DCF2F1` }}>
            <div className="card-body">
              <h4 className="card-title mb-4" style={{ color: '#2D9596' }}>User Details</h4>
              <div className="mb-3">
                <strong>Name:</strong> {userData.fullName}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {userData.emailId}
              </div>
            </div>
          </div>
          <div className="card mt-4" style={{ backgroundColor: `#DCF2F1` }}>
            <div className="card-body">
              <h4 className="card-title mb-3" style={{ color: '#2D9596' }}>History</h4>
              <div className="mb-3">
                <h5 className="mb-2">Insurance History</h5>
                {/* Display insurance history */}
                {showInsuranceHistory && (
                  <ul className="list-group">
                    {policies.map(policy => (
                      <li key={policy.insuranceId} className="list-group-item">Type : {policy.policyType}, Residual Amount: {policy.residualAmount}</li>
                    ))}
                  </ul>
                )}
                <button onClick={handleViewInsuranceHistory} className="btn btn-outline-primary mt-2">View Insurance History</button>
              </div>
              <div>
                <h5 className="mb-2">Claim History</h5>
                {/* Display claim history */}
                {showClaimHistory && (
                  <ul className="list-group">
                    {claims.map(claim => (
                      <li key={claim.claimId} className="list-group-item">Claim Amount: {claim.claimedAmount}, Status: {claim.status}</li>
                    ))}
                  </ul>
                )}
                <button onClick={handleViewClaimHistory} className="btn btn-outline-primary mt-2">View Claim History</button>
              </div>
            </div>
          </div>
        </div>
        {/* Buttons for adding and claiming insurance */}
        <div className="col-md-6">
          <div className="card" style={{ backgroundColor: `#DCF2F1` }}>
            <div className="card-body">
              <h4 className="card-title mb-4" style={{ color: '#2D9596' }}>Insurance Actions</h4>
              <div className="mb-3">
                <button onClick={handleAddInsurance} className="btn btn-outline-primary me-2">Add Insurance</button>
                <button onClick={handleClaimInsurance} className="btn btn-outline-primary">Claim Insurance</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default User;
