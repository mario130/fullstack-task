import { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [showRegister, setShowRegister] = useState(true);

  return (
    <div className="min-h-screen bg-[#18171F] text-white flex flex-col justify-center items-center">
      <div className="bg-[#24232C] p-8 rounded shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">User Authentication</h1>
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`py-2 px-4 rounded ${showRegister ? 'bg-orange-500' : 'bg-gray-600'}`}
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
          <button
            className={`py-2 px-4 rounded ${!showRegister ? 'bg-orange-500' : 'bg-gray-600'}`}
            onClick={() => setShowRegister(false)}
          >
            Login
          </button>
        </div>
        {showRegister ? <Register /> : <Login />}
      </div>
    </div>
  );
}

export default App;