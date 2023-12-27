import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login=()=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const navigate=useNavigate()
  const handleLogin = async () => {
    try {
      // Send user credentials to the backend for authentication
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });

      // If login is successful, you might handle the response (e.g., save token in localStorage)
      const { token } = response.data;
      // Example: Save token in localStorage
      localStorage.setItem('token', token);

      // Optionally, redirect to a different page after successful login
      // history.push('/dashboard'); // If using React Router (import useHistory from 'react-router-dom')

      // Reset username and password fields after successful login
      setUsername('');
      setPassword('');
      navigate("/movies")
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure (e.g., show error message to the user)
    }
  };

  return (
    <div className='login'>
        <h1 className='login-header'>Sign in</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        <div className='remember'>
          <label>
            <input
              type="checkbox"
              className="hidden-checkbox"
              
            />
                   <span className="checkbox-design"></span>
            Remember Me
          </label>
        </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
