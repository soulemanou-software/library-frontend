import { Link } from 'react-router-dom';
import { BookOpen, Search, Users, Shield, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Vast Collection',
      description: 'Access thousands of books across multiple genres and categories.'
    },
    {
      icon: Search,
      title: 'Easy Search',
      description: 'Find any book quickly with our powerful search and filter system.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a community of book lovers and share your reading experience.'
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Your data is protected with industry-standard security measures.'
    }
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Digital Library
              <span className="block text-primary-200">Management System</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 leading-relaxed">
              Discover, organize, and manage your book collection with ease. 
              King Solomon's BOOKS provides a modern solution for libraries and book enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/books"
                className="inline-flex items-center justify-center bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Browse Books
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center bg-primary-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-400 transition-colors border border-primary-400"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose King Solomon's BOOKS?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to manage your library efficiently and effectively.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already managing their libraries with King Solomon's BOOKS.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors"
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-primary-500" />
              <span className="text-white font-semibold">King Solomon's BOOKS</span>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} King Solomon's BOOKS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
