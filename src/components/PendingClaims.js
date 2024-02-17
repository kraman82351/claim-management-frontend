import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

function PendingClaims() {
  const navigate = useNavigate();
  const [pendingClaims, setPendingClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    const fetchPendingClaims = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/pending_claims');
        setPendingClaims(response.data);
      } catch (error) {
        toast.error('Failed to retrieve Pending Claims')
        console.log("Failed to retrieve Pending Claims");
      }
    };

    fetchPendingClaims();
  }, []);

  const handleClaimSelect = (claim) => {
    setSelectedClaim(claim);
  };

  const handleApprove = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin/pending_claims', {
        claimId: selectedClaim.claimId,
        status: "Approved"
      });
      toast.success("Claim Apporved");
      navigate('/admin');
    } catch (error) {
      handleError(error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin/pending_claims', {
        claimId: selectedClaim.claimId,
        status: "Rejected"
      });
      toast.success('claim Rejected');
      navigate('/admin');
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } else {
      toast.error('An error occurred during sending claim request.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Pending Claims</h2>
          <div className="mb-3">
            <label htmlFor="claimId" className="form-label">Select claim:</label>
            <select
              id="claimId"
              name="claimId"
              value={selectedClaim ? selectedClaim.claimId : ''}
              onChange={(e) => {
                const claim = pendingClaims.find(c => c.claimId === e.target.value);
                handleClaimSelect(claim);
              }}
              className="form-control"
            >
              <option value="">-- Select Claim --</option>
              {pendingClaims.map(claim => (
                <option key={claim.claimId} value={claim.claimId}>
                  Claim ID: {claim.claimId} - Claim Amount: {claim.claimedAmount} - Reason: {claim.reason} - Request Date: {claim.requestDate}
                </option>
              ))}
            </select>
          </div>
          {selectedClaim && (
           <div className="d-flex justify-content-center align-items-center">
           <button type="button" className="btn btn-outline-success mr-5" onClick={handleApprove}>Approve</button>
           <button type="button" className="btn btn-outline-danger ml-5" onClick={handleReject}>Reject</button>
           <Toaster/>
         </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PendingClaims;
