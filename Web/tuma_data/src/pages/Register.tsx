import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3001/api/register', { username, password });
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4"
        />
        <button onClick={handleRegister} className="w-full bg-blue-500 text-white p-2 rounded-lg">
          Register
        </button>
      </div>
    </div>
  );
}
