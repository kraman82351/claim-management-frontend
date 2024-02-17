import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from 'react-router-dom';

function ClaimInsurance() {

  const location = useLocation();
  const navigate = useNavigate();
  const { emailId, userId } = location.state || {};
  
  const [formData, setFormData] = useState({
    insuranceId: '',
    reason: '',
    claimedAmount: ''
  });

  const [policies, setPolicies] = useState([]);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState('');

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`https://claim-management-system.onrender.com/user/policies/${userId}`);
        setPolicies(response.data);
      } catch (error) {
        console.log("Failed to retrieve Policies");
      }
    };

    fetchPolicies();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePolicySelect = (insuranceId) => {
    setSelectedInsuranceId(insuranceId);
    setFormData(prevState => ({
      ...prevState,
      insuranceId: insuranceId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post('https://claim-management-system.onrender.com/home/claim_insurance', formData);
        if(response.data.status == 200){
          toast.success(response.data.message);
          navigate('/user', { state: { emailId: emailId } });
        }else{
          toast.error('Claimed Amount is more than Residual amount');
        }
    }
    catch(error){
      if (error.response) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred during sending claim request.');
      }
    }
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
              <label htmlFor="insuranceId" className="form-label">Select Policy:</label>
              <select
                id="insuranceId"
                name="insuranceId"
                value={selectedInsuranceId}
                onChange={(e) => handlePolicySelect(e.target.value)}
                className="form-control"
              >
                <option value="">-- Select Policy --</option>
                {policies.map(policy => (
                  <option key={policy.insuranceId} value={policy.insuranceId}>
                      Policy Type: {policy.policyType} - Residual Amount: {policy.residualAmount}- Coverage Amount: {policy.coverageAmount}
                  </option>
              ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="claimReason" className="form-label">Claim Reason:</label>
              <textarea 
                id="claimReason" 
                name="reason" 
                value={formData.reason} 
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
                name="claimedAmount" 
                value={formData.claimedAmount} 
                onChange={handleInputChange} 
                className="form-control" 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Request Claim</button>
            <Toaster/>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClaimInsurance;
