import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Homepage from './pages/Homepage';
import Authentication from './components/Authentication';

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">

        <Routes>
          <Route path="/login" element={<Authentication />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/homepage" element={<Homepage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;