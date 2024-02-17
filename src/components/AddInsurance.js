import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from 'react-router-dom';

function AddInsurance() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, emailId } = location.state || {};
  const [availablePolicies, setAvailablePolicies] = useState([]);
  const [selectedPolicyNumber, setSelectedPolicyNumber] = useState('');

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/home/add_insurance');
        setAvailablePolicies(response.data);
      } catch (error) {
        console.log("Failed to retrieve Policies");
      }
    };

    fetchPolicies();
  }, []);

  const handlePolicySelect = (policyNumber) => {
    setSelectedPolicyNumber(policyNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/home/add_insurance', {
        userId: userId,
        policyNumber: selectedPolicyNumber
      });
      toast.success(response.data.message);
      navigate('/user', { state: { emailId: emailId } });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred during sending claim request.');
      }
    }
  };

  return (
    <div className="container rounded border p-3 mt-5">
      <div className="card border ">
        <div className="card-body">
          <h2 className="card-title text-center h3 font-weight-bold mb-4">Add Insurance</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="policyNumber" className="form-label-control">Select Policy:</label>
              <select
                id="policyNumber"
                name="policyNumber"
                value={selectedPolicyNumber}
                onChange={(e) => handlePolicySelect(e.target.value)}
                className="form-control w-75 mx-auto"
              >
                <option value="" disabled defaultValue className="text-muted">-- Select Policy --</option>
                {availablePolicies.map(policy => (
                  <option key={policy.policyNumber} value={policy.policyNumber}>
                    Policy Number: {policy.policyNumber} - Policy Type: {policy.policyType} - Premium: {policy.premium} - Coverage Amount: {policy.coverageAmount}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-block font-weight-bold mt-3">Request Claim</button>
            <Toaster/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddInsurance;
