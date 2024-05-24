import { useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/homepage');
    }
  }, []);

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full overflow-hidden">
      <h1 className="text-2xl font-bold text-center mb-4">User Authentication</h1>
      <div className="flex justify-center space-x-6 mb-4">
        <button
          className={`py-2 px-4 rounded ${!showRegister ? 'bg-green-500' : 'bg-gray-600'}`}
          onClick={() => setShowRegister(false)}
        >
          Login
        </button>
        <button
          className={`py-2 px-4 rounded ${showRegister ? 'bg-green-500' : 'bg-gray-600'}`}
          onClick={() => setShowRegister(true)}
        >
          Register
        </button>
      </div>
      {showRegister ? <Register /> : <Login />}
    </div>
  )
}
