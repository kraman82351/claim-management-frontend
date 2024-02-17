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
        const response = await axios.get('http://localhost:3000/admin/getcount');
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
      style={{ maxWidth: "800px" }}
    >
      
      <div
        className="card bg-light shadow rounded-lg"
        style={{ width: "100%" }}
      >
        <div className="card-body text-center py-5 px-4">
          <h2 className="h1 mb-4 text-primary">Admin Dashboard</h2>
          <div className="mb-5">
            <strong className="mr-2 font-weight-bold">Total Members:</strong>{" "}
            {totalMembers}
          </div>
          <div className="mb-5">
            <strong className="mr-2 font-weight-bold">Total Policies:</strong>{" "}
            {totalPolicies}
          </div>
          <div className="mb-5">
            <strong className="mr-2 font-weight-bold">Total Claims:</strong>{" "}
            {totalClaims}
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
