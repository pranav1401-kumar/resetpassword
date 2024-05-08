import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    // Function to get URL parameters
    const getQueryParam = param => {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get(param);
    };

    // Set the token value from URL parameter
    setToken(getQueryParam('token'));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const data = JSON.stringify({
      token: token,
      password: password
    });

    fetch('http://35.154.136.249:8000/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    .then(response => response.json())
    .then(data => {
      alert('Password reset successful');
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to reset password');
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleSubmit}>
          {/* Hidden Field to Store Token */}
          <input type="hidden" id="token" name="token" value={token} />

          {/* Field for New Password */}
          <div className="form-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Field for Confirming New Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
