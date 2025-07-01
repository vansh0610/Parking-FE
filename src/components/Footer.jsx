function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">ParkingApp</h3>
          <p className="text-gray-400">
            Find, book, and manage parking slots for 2W, 3W, and 4W vehicles with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="/" className="text-gray-400 hover:text-white">Dashboard</a></li>
            <li><a href="/login" className="text-gray-400 hover:text-white">Login</a></li>
            <li><a href="/register" className="text-gray-400 hover:text-white">Register</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-400">Email: support@parkingapp.com</p>
          <p className="text-gray-400 mb-2">Phone: +91 98765 43210</p>
          
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} ParkingApp. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
