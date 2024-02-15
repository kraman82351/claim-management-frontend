
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
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
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>Don't have an account? <a href="/register">Register here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
