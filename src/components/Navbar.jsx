import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link to="" className="text-xl font-bold">
        🚗 ParkingApp
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/my-bookings" className="hover:underline">
          My Bookings
        </Link>
        <button
          onClick={handleLogout}
          className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;




// import { Link, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

// function Navbar() {
//   const navigate = useNavigate();
//   const [darkMode, setDarkMode] = useState(false);
//   const token = localStorage.getItem('token');

//   // Optional: persist dark mode in localStorage
//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', darkMode);
//   }, [darkMode]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-900 dark:text-white text-gray-800 px-6 py-4 shadow-md flex justify-between items-center">
//       {/* Logo */}
//       <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
//         🚗 ParkingApp
//       </Link>

//       {/* Navigation links */}
//       <div className="flex items-center gap-4">
//         {token && (
//           <Link to="/my-bookings" className="hover:underline text-sm font-medium">
//             My Bookings
//           </Link>
//         )}

//         {/* Dark Mode Toggle */}
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="text-xs px-3 py-1 border rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
//         >
//           {darkMode ? '☀️ Light' : '🌙 Dark'}
//         </button>

//         {/* Logout Button */}
//         {token && (
//           <button
//             onClick={handleLogout}
//             className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition text-sm"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
