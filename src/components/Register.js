
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    emailId: '',
    address: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/register', formData);
      toast.success(response.data.message);
      // Clear form fields upon successful registration
      setFormData({
        fullName: '',
        address: '',
        emailId: '',
        password: ''
      });
      navigate('/');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred during registration.');
      }
    }  
     
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name:</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">Email:</label>
                  <input 
                    type="email" 
                    id="emailId" 
                    name="emailId" 
                    value={formData.emailId} 
                    onChange={handleInputChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address:</label>
                  <input 
                    type="text" 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleInputChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary" >Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
