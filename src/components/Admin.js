import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalClaims, setTotalClaims] = useState(0);
  const [approvedClaims, setApprovedClaims] = useState(0);

  useEffect(() => {
    // Fetch admin data when component mounts
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    // Simulated data fetching
    // Replace this with actual API call to fetch admin data
    const adminData = {
      totalMembers: 100,
      totalClaims: 500,
      approvedClaims: 300
    };

    setTotalMembers(adminData.totalMembers);
    setTotalClaims(adminData.totalClaims);
    setApprovedClaims(adminData.approvedClaims);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <strong>Total Members:</strong> {totalMembers}
          </div>
          <div className="mb-3">
            <strong>Total Claims:</strong> {totalClaims}
          </div>
          <div className="mb-3">
            <strong>Approved Claims:</strong> {approvedClaims}
          </div>
          <Link to="/pending_claims" className="btn btn-primary">Pending Claims</Link>
        </div>
      </div>
    </div>
  );
}

export default Admin;
