import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Admin() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalClaims, setTotalClaims] = useState(0);
  const [totalPolicies, setTotalPolicies] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch admin data when component mounts
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('https://claim-management-system.onrender.com/admin/getcount');
        const adminData = response.data;

        setTotalMembers(adminData.totalUsers);
        setTotalClaims(adminData.totalClaims);
        setTotalPolicies(adminData.totalPolicies);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    // Logic for logout, navigate to root route
    navigate('/');
  };

  const handleAddPolicy = () => {
    // Logic to navigate to addPolicy route
    navigate('/admin/addPolicy');
  };

  return (
    <div
      className="container mt-5 d-flex justify-content-center"
      style={{ maxWidth: "800px" ,maxHeight:"800px"}}
    >
      <nav className="navbar navbar-expand-lg " style={{ backgroundColor: `#265073` }} >
        <div className="container-fluid">
          <h1 className="navbar-brand font-weight-bold" style={{ color: 'white' }}>Claim Management System</h1>
        </div>
      </nav>
      <div
        className="card bg-light shadow rounded-lg"
        style={{ width: "80%", height: "80%"}}
      >
        <div className="card-body text-center py-5 px-4" style={{ backgroundColor: `#DCF2F1` }}>
          <h2 className="h1 mb-4 " style={{ color: '#2D9596' }}>Admin Dashboard</h2>
          <div className="mb-5">
            <h4>
            <strong className="mr-2 font-weight-bold">Total Members:</strong>{" "}
            {totalMembers}
            </h4>
            
          </div>
          <div className="mb-5">
            <h4>
            <strong className="mr-2 font-weight-bold">Total Policies:</strong>{" "}
            {totalPolicies}
            </h4>
            
          </div>
          <div className="mb-5">
            <h4>
            <strong className="mr-2 font-weight-bold">Total Claims:</strong>{" "}
            {totalClaims}
            </h4>
            
          </div>
          <div className="mb-5 d-grid gap-3">
            <Link
              to="/admin/pendingClaims"
              className="btn btn-outline-primary btn-lg"
            >
              Pending Claims
            </Link>
            <button
              onClick={handleAddPolicy}
              className="btn btn-outline-success btn-lg"
            >
              Add New Policy
            </button>
            <button onClick={handleLogout} className="btn btn-outline-danger btn-lg">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>


  );
}

export default Admin;
