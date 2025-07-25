import React from 'react'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
              <div className="w-6 h-6 bg-amber-600 rounded-full"></div>
            </div>
            <span className="text-2xl font-bold text-purple-800 font-handwritten">BUKNEST</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Services</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium py-2">Home</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium py-2">Services</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium py-2">About</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 font-medium py-2">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header