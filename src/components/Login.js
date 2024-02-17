
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom' // Assuming you're using React Router

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    emailId: '',
    password: ''
  });
  const [role, setRole] = useState('user'); // Default role is user

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Depending on the selected role, call the appropriate API endpoint
      const url = role === 'admin' ? 'http://localhost:3000/adminlogin' : 'http://localhost:3000/userlogin';
      const response = await axios.post(url, formData);
      if(role === 'admin'){
        toast.success('Admin login Successfully')
        navigate('/admin');
      }else{
        toast.success('Login Successfully')
        navigate('/user', { state: { emailId: formData.emailId, userId: response.data.userId } });
      }
      console.log(response.data); // Do something with the response
    } catch (error) {
      toast.error('Login failed');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
            <h3 className="card-title mb-4" style={{ color: `#265073` }} >Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="userRole"
                      value="user"
                      checked={role === 'user'}
                      onChange={() => setRole('user')}
                    />
                    <label className="form-check-label" htmlFor="userRole">
                      User
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="adminRole"
                      value="admin"
                      checked={role === 'admin'}
                      onChange={() => setRole('admin')}
                    />
                    <label className="form-check-label" htmlFor="adminRole">
                      Admin
                    </label>
                  </div>
                </div>
                {role === 'user' && (
                  <div className="mb-3">
                    <p>Don't have an account? <Link to="/register">Register here</Link></p>
                  </div>
                )}
                <div className="mb-5 d-grid gap-3">
                  <button type="submit" className="btn btn-outline-primary btn-lg">Login</button>
                </div>
                
                <Toaster/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
