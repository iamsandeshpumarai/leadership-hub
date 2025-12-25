import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const Setting = () => {
  const [formData, setFormData] = useState({
    oldEmail: '',
    oldPassword: '',
    newEmail: '',
    newPassword: '',
  });

const userData = useMutation({
  mutationKey:["data"],
  mutationFn: async (data)=>{
    const response = await axios.put("https://backendleadershiphub-2.onrender.com/setting/updatecredentails",data)
    console.log(response.data);
  },
  onSuccess:(data)=>{
    console.log(data,"is the data")
   toast.success("Credentials Updated Successfully")
  },
  onError:(err)=>{
    console.log(err)
    toast.error(err.response.data.message || "Failed to update credentials")
  }
})

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    userData.mutate(formData)

  };


  return (
    <div className="container">
      {/* Inline CSS for responsiveness */}
      <style>{`
        .container {
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        .section-title {
          font-size: 1.1rem;
          color: #555;
          margin-bottom: 15px;
          border-bottom: 2px solid #eee;
          padding-bottom: 5px;
        }
        .input-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 600;
          font-size: 0.9rem;
        }
        input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          box-sizing: border-box; /* Crucial for responsiveness */
          font-size: 1rem;
        }
        .submit-btn {
          grid-column: 1 / -1; /* Spans full width in grid */
          padding: 14px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .submit-btn:hover {
          background-color: #0056b3;
        }

        /* Responsive Media Query for Tablets and Desktops */
        @media (min-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Security Settings</h2>
      
      <form  className="form-grid">
        
        {/* Left Side: Verification */}
        <div className="form-section">
          <h3 className="section-title">Verify Identity</h3>
          <div className="input-group">
            <label>Old Gmail</label>
            <input
              type="email"
              name="oldEmail"
              placeholder="current@gmail.com"
              value={formData.oldEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="••••••••"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Right Side: Update */}
        <div className="form-section">
          <h3 className="section-title">New Credentials</h3>
          <div className="input-group">
            <label>New Gmail</label>
            <input
              type="email"
              name="newEmail"
              placeholder="new@gmail.com"
              value={formData.newEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Min 8 characters"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button onClick={handleSubmit} type="submit" className="submit-btn">
          Confirm Changes
        </button>
      </form>

      
      
      
    </div>
  );
};

export default Setting;