import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import MyBookings from './pages/MyBooking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Register />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/my-bookings' element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
