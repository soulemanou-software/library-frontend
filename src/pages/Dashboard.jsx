import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import { BookOpen, PlusCircle, User, Mail, Calendar, BookX } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0
  });

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const fetchUserBooks = async () => {
    try {
      const response = await api.get('/books?limit=100');
      const allBooks = response.data.data;
      const userId = user?.id || user?._id;
      const userBooks = allBooks.filter(book => book.addedBy?._id === userId);
      setBooks(userBooks);
      setStats({
        totalBooks: userBooks.length,
        availableBooks: userBooks.filter(b => b.available).length
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mx-auto mb-4">
              <User className="h-10 w-10 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
              {user?.name}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {user?.email}
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                Member since {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Books Added</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBooks}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Available</p>
                  <p className="text-3xl font-bold text-green-600">{stats.availableBooks}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Your Books</h2>
              <Link to="/add-book" className="btn-primary text-sm inline-flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Book
              </Link>
            </div>
            <div className="p-6">
              {loading ? (
                <Loading />
              ) : books.length === 0 ? (
                <div className="text-center py-12">
                  <BookX className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No books yet</h3>
                  <p className="text-gray-500 mb-6">Start by adding your first book to the library</p>
                  <Link to="/add-book" className="btn-primary inline-flex items-center gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Add Your First Book
                  </Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {books.slice(0, 6).map((book) => (
                    <BookCard key={book._id} book={book} />
                  ))}
                </div>
              )}
              {books.length > 6 && (
                <div className="text-center mt-6">
                  <Link to="/books" className="text-primary-600 hover:text-primary-700 font-medium">
                    View all books →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
