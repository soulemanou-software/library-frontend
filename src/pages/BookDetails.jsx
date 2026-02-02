import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import { 
  BookOpen, User, Calendar, Building, Hash, Globe, 
  FileText, ArrowLeft, Edit, Trash2, CheckCircle, XCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      setBook(response.data.data);
    } catch (error) {
      toast.error('Book not found');
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    setDeleting(true);
    try {
      await api.delete(`/books/${id}`);
      toast.success('Book deleted successfully');
      navigate('/books');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete book');
    } finally {
      setDeleting(false);
    }
  };

  const canModify = isAuthenticated && (user?.id === book?.addedBy?._id || user?.role === 'admin');

  if (loading) return <Loading />;
  if (!book) return null;

  return (
    <div className="page-container">
      <Link
        to="/books"
        className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Books
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="card overflow-hidden sticky top-24">
            <div className="aspect-[3/4] bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
              {book.coverImage && book.coverImage !== 'https://via.placeholder.com/150x200?text=No+Cover' ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <BookOpen className="h-24 w-24 text-primary-300" />
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="card p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
                  {book.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-lg">{book.author}</span>
                </div>
              </div>
              {canModify && (
                <div className="flex gap-2">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="btn-danger inline-flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${
                book.available 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {book.available ? (
                  <><CheckCircle className="h-4 w-4" /> Available</>
                ) : (
                  <><XCircle className="h-4 w-4" /> Not Available</>
                )}
              </span>
              {book.quantity > 0 && (
                <span className="text-gray-500 text-sm">
                  {book.quantity} copies in stock
                </span>
              )}
            </div>

            {book.description && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">{book.description}</p>
              </div>
            )}

            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Book Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Hash className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">ISBN</p>
                    <p className="font-medium text-gray-900">{book.isbn}</p>
                  </div>
                </div>
                {book.publishedYear && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Published Year</p>
                      <p className="font-medium text-gray-900">{book.publishedYear}</p>
                    </div>
                  </div>
                )}
                {book.publisher && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Building className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Publisher</p>
                      <p className="font-medium text-gray-900">{book.publisher}</p>
                    </div>
                  </div>
                )}
                {book.pages && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Pages</p>
                      <p className="font-medium text-gray-900">{book.pages}</p>
                    </div>
                  </div>
                )}
                {book.language && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Language</p>
                      <p className="font-medium text-gray-900">{book.language}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {book.addedBy && (
              <div className="border-t border-gray-100 mt-6 pt-6">
                <p className="text-sm text-gray-500">
                  Added by <span className="font-medium text-gray-700">{book.addedBy.name}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
