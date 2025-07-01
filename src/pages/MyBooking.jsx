  import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [activeBookings, setActiveBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const fetchCurrentBooking = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/bookings/my', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(res.data.bookings || []);
      setActiveBookings(res.data.activeBookings || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setBookings([]);
      setActiveBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentBooking();
  }, []);

  const handleCompleteBooking = async (bookingId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/bookings/exit/${bookingId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`Booking completed. Amount: ₹${res.data.amount}`);
      setMessage(`✅ ${res.data.message} | Amount: ₹${res.data.amount} for ${res.data.durationHours} hour(s).`);
      fetchCurrentBooking();
    } catch (err) {
      console.error('Error completing booking:', err);
      setMessage(err.response?.data?.message || 'Failed to complete booking.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">My Bookings</h2>

          {message && (
            <p className="text-center text-indigo-600 font-semibold mb-4">{message}</p>
          )}

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              {/* Active Bookings */}
              <h3 className="text-xl font-bold mb-2 mt-4">Active Bookings</h3>
              {activeBookings.length === 0 ? (
                <p className="text-gray-500">No active bookings</p>
              ) : (
                activeBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="p-4 border rounded shadow bg-white mb-4"
                  >
                    <p><strong>Slot:</strong> {booking.slot?.slotNumber || 'N/A'}</p>
                    <p><strong>Vehicle Type:</strong> {booking.slot?.allowedVehicleType || 'N/A'}</p>
                    <p><strong>Booked At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
                    <p className="font-semibold text-green-600">✅ Active Booking</p>
                    <button
                      onClick={() => handleCompleteBooking(booking._id)}
                      className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Complete Booking
                    </button>
                  </div>
                ))
              )}

              {/* All Bookings */}
              <h3 className="text-xl font-bold mb-2 mt-8">All Bookings</h3>
              {bookings.length === 0 ? (
                <p className="text-center text-gray-600">No bookings found.</p>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="p-4 border rounded shadow bg-white mb-4"
                  >
                    <p><strong>Slot:</strong> {booking.slot?.slotNumber || 'N/A'}</p>
                    <p><strong>Vehicle Type:</strong> {booking.slot?.allowedVehicleType || 'N/A'}</p>
                    <p><strong>Booked At:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
                    <p className={`font-semibold ${booking.isComplete ? 'text-gray-500' : 'text-green-600'}`}>
                      {booking.isComplete ? '❌ Completed Booking' : '✅ Active Booking'}
                    </p>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MyBookings;
