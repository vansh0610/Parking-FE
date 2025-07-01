import axios from 'axios';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const AdminPanel = () => {
  const [slotNumber, setSlotNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('2-wheeler');
  const [message, setMessage] = useState('');
  const [slots, setSlots] = useState([]); // 🔸 state for slot details
  const [showSlots, setShowSlots] = useState(false);
  const token = localStorage.getItem('token');

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3000/api/slots/',
        {
          slotNumber,
          allowedVehicleType: vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(res.data.message || 'Slot created successfully');
      setSlotNumber('');
      setVehicleType('2-wheeler');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create slot');
    }
  };

  const fetchAllSlots = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/slots/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched slots:", res.data.slots);
      setSlots(res.data.slots || []);
      setShowSlots(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to fetch slots');
    }
  };

  const deleteSlots=async (slotId) => {
    try {
           await axios.delete(`http://localhost:3000/api/slots/${slotId}`,{
             headers: {
        Authorization: `Bearer ${token}`,
      },
        })
        alert('Slot deleted successfully');
        fetchAllSlots();
        
    } catch (err) {
         alert(err.response?.data?.message || 'Failed to delete slot');
    }
    
  }
  
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 bg-white shadow-2xl p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-center">Create New Slot</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            value={slotNumber}
            onChange={(e) => setSlotNumber(e.target.value)}
            placeholder="Enter Slot Number"
            className="w-full px-3 py-2 border rounded"
            required
          />

          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="2-wheeler">2-wheeler</option>
            <option value="3-wheeler">3-wheeler</option>
            <option value="4-wheeler">4-wheeler</option>
          </select>

         <div className="flex justify-center">
  <button
    type="submit"
    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
  >
    Create Slot
  </button>
</div>
        </form>

        <button
          onClick={fetchAllSlots}
          className="w-full mt-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          View All Slots
        </button>
 
        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}
      </div>

      {/* Slot Details List */}
      {showSlots && (
        <div className="max-w-3xl mx-auto mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">All Slot Details</h3>
          {slots.length === 0 ? (
            <p className="text-center text-gray-600">No slots available.</p>
          ) : (
            <div className="grid gap-4">
              {slots.map((slot) => (
                 
                <div
                  key={slot._id}
                  className="bg-white shadow p-4 rounded border"
                >
                  <p><strong>Slot Number:</strong> {slot.slotNumber}</p>
                  <p><strong>Vehicle Type:</strong> {slot.allowedVehicleType}</p>
                  <p>
                    <strong>Status:</strong>{' '}
                    {slot.isAvailable ? (
                      <span className="text-green-600">Available</span>
                    ) : (
                      <span className="text-red-600">Booked</span>
                    )}
                  </p>
                  <p>
                    <strong>Current Booking:</strong>{' '}
                    {slot.currentBooking || 'None'}

                   
                  </p>
                  {slot.isAvailable && (
                     <button onClick={() => {
                      deleteSlots(slot._id)
                    }
                    } 
                    className="mt-3 px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded">Delete Slot</button>
                  )

                  }
                 </div>
              ))}
            </div>
          )}
        </div>
      )}
       <Footer />
    </div>
  );
};

export default AdminPanel;
