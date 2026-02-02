import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Menu, X, LogOut, User, PlusCircle, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">King Solomon's BOOKS</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/books"
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Browse Books
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/add-book"
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Book
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-500 hover:text-red-600 p-2 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/books"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              Browse Books
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/add-book"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Add Book
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Dashboard
                </Link>
                <div className="pt-2 border-t border-gray-100">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Signed in as {user?.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 bg-primary-600 text-white rounded-lg text-center"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
