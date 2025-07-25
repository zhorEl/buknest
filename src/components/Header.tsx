import React from 'react'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center mr-3 shadow-lg">
              <div className="w-6 h-6 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full"></div>
            </div>
            <span className="text-2xl font-bold text-purple-800 font-serif">BUKNEST</span>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">Home</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">Services</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">About</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-all">Home</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-all">Services</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-all">About</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-all">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header