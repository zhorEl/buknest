import React from 'react'
import { Menu, X, Baby } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <Baby className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-purple-800">BUKNEST</span>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Services</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">About</a>
            <a href="#" className="text-gray-700 hover:text-purple-600 font-medium">Contact</a>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Get Started Button */}
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
              Get Started
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
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