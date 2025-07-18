import { useEffect, useState } from 'react';
import logo from '../../../public/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="bg-white w-full h-auto p-4 flex items-center justify-between">
      <img src={logo} alt="Logo" className="h-20 w-auto" />

      {isLoggedIn && (
        <div
          className="relative"
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          <div className="flex items-center space-x-4">
            <img
              src="../../../public/dp.png"
              alt="Profile"
              className="h-20 w-20 rounded-full cursor-pointer"
            />
            {showLogout && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">Logout</span>
              </button>

            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Header;
