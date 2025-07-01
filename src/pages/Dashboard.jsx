 import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Dashboard() {
  const [vehicleType, setVehicleType] = useState('2-wheeler');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [startTime, setStartTime] = useState('');

  const token = localStorage.getItem('token');

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/api/slots?type=${vehicleType}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSlots(res.data.slots);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to fetch slots');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSlots();
  }, [vehicleType]);

  const handleBooking = async (slotId) => {
    if (!token) {
      setMessage('You must be logged in to book a slot.');
      return;
    }

    if (!startTime) {
      setMessage('Please select a start time before booking.');
      return;
    }
console.log("Booking Payload:", {
  vehicleType,
  startTime: new Date(startTime).toISOString(),
});
    try {
      const res = await axios.post(
        `http://localhost:3000/api/bookings/book/${slotId}`,
        {
          vehicleType,
          startTime: new Date(startTime).toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message || 'Slot booked!');
      fetchSlots();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">Parking Dashboard</h1>

          {/* Vehicle type filter */}
          <div className="flex justify-center gap-4 mb-4">
            {['2-wheeler', '3-wheeler', '4-wheeler'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setVehicleType(type);
                  setMessage('');
                }}
                className={`px-4 py-2 rounded font-medium ${
                  vehicleType === type
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-indigo-600 text-indigo-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Start time input */}
          <div className="mb-6 text-center">
            <label className="font-medium mr-2">Select Start Time:</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border px-3 py-1 rounded"
              required
            />
          </div>

          {message && (
            <p className="text-center text-green-600 font-medium mb-4">{message}</p>
          )}

          {loading ? (
            <p className="text-center">Loading slots...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {slots.length === 0 ? (
                <p className="col-span-full text-center text-gray-600">
                  No slots found.
                </p>
              ) : (
                slots.map((slot) => (
                  <div
                    key={slot._id}
                    className={`p-4 border rounded-lg shadow-md ${
                      slot.isBooked ? 'bg-red-100' : 'bg-green-100'
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      Slot: {slot.slotNumber || 'N/A'}
                    </h3>
                    <p>
                      Status:{' '}
                      <strong
                        className={
                          slot.isAvailable ?  'text-green-600':'text-red-600'
                        }
                      >
                        {!slot.isAvailable ? 'Booked' : 'Available'}
                      </strong>
                    </p>
                    <p className="text-sm font-medium text-gray-700 bg-indigo-100 px-3 py-1 rounded-full inline-block mt-2">
                      For: {slot.allowedVehicleType}
                    </p>

{slot.isAvailable && (
                        <button
                        onClick={() => handleBooking(slot._id)}
                        disabled={!startTime}
                        className={`mt-4 px-4 py-2 text-white rounded ${
                          !startTime
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                      >
                        Book Slot
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
