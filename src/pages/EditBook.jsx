import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import { ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    description: '',
    category: '',
    publishedYear: '',
    publisher: '',
    pages: '',
    language: '',
    coverImage: '',
    quantity: 1,
    available: true
  });

  useEffect(() => {
    fetchCategories();
    fetchBook();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/books/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBook = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      const book = response.data.data;
      setFormData({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        description: book.description || '',
        category: book.category || '',
        publishedYear: book.publishedYear || '',
        publisher: book.publisher || '',
        pages: book.pages || '',
        language: book.language || '',
        coverImage: book.coverImage || '',
        quantity: book.quantity || 1,
        available: book.available ?? true
      });
    } catch (error) {
      toast.error('Book not found');
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dataToSend = { ...formData };
      if (dataToSend.publishedYear) dataToSend.publishedYear = parseInt(dataToSend.publishedYear);
      if (dataToSend.pages) dataToSend.pages = parseInt(dataToSend.pages);
      if (dataToSend.quantity) dataToSend.quantity = parseInt(dataToSend.quantity);

      await api.put(`/books/${id}`, dataToSend);
      toast.success('Book updated successfully!');
      navigate(`/books/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update book');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="page-container">
      <Link
        to={`/books/${id}`}
        className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Book Details
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="card p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Book</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ISBN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="isbn"
                  required
                  value={formData.isbn}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Published Year
                </label>
                <input
                  type="number"
                  name="publishedYear"
                  value={formData.publishedYear}
                  onChange={handleChange}
                  className="input-field"
                  min="1000"
                  max={new Date().getFullYear()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Publisher
                </label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Pages
                </label>
                <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  className="input-field"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Language
                </label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="input-field"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="input-field resize-none"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="available"
                id="available"
                checked={formData.available}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="available" className="ml-2 text-sm text-gray-700">
                Available for borrowing
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="btn-primary flex-1 flex items-center justify-center"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Saving Changes...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
              <Link to={`/books/${id}`} className="btn-secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
