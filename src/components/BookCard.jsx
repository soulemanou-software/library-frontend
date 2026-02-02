import { Link } from 'react-router-dom';
import { BookOpen, User, Calendar } from 'lucide-react';

const BookCard = ({ book }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Fiction': 'bg-purple-100 text-purple-700',
      'Non-Fiction': 'bg-blue-100 text-blue-700',
      'Science': 'bg-green-100 text-green-700',
      'Technology': 'bg-cyan-100 text-cyan-700',
      'History': 'bg-amber-100 text-amber-700',
      'Biography': 'bg-rose-100 text-rose-700',
      'Self-Help': 'bg-orange-100 text-orange-700',
      'Children': 'bg-pink-100 text-pink-700',
      'Mystery': 'bg-slate-100 text-slate-700',
      'Romance': 'bg-red-100 text-red-700',
      'Fantasy': 'bg-indigo-100 text-indigo-700',
      'Other': 'bg-gray-100 text-gray-700'
    };
    return colors[category] || colors['Other'];
  };

  return (
    <Link to={`/books/${book._id}`} className="card group hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center overflow-hidden">
        {book.coverImage && book.coverImage !== 'https://via.placeholder.com/150x200?text=No+Cover' ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <BookOpen className="h-16 w-16 text-primary-300" />
        )}
        <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(book.category)}`}>
          {book.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {book.title}
        </h3>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <User className="h-3.5 w-3.5 mr-1" />
          <span className="line-clamp-1">{book.author}</span>
        </div>
        {book.publishedYear && (
          <div className="flex items-center text-gray-400 text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{book.publishedYear}</span>
          </div>
        )}
        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className={`text-xs font-medium ${book.available ? 'text-green-600' : 'text-red-500'}`}>
            {book.available ? 'Available' : 'Not Available'}
          </span>
          {book.quantity > 0 && (
            <span className="text-xs text-gray-400">{book.quantity} copies</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
