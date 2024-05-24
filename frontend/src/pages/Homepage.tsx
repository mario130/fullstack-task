import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Homepage</h1>
        <p className="text-center">The homepage is only accessible to authenticated users</p>
        <button onClick={logout} type="button" className="w-full bg-red-600 text-white py-2 mt-4 px-4 rounded shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Homepage;