import React from 'react'
import { Heart } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-pink-800 mr-2" />
            <span className="text-2xl font-bold text-pink-800 font-handwritten">NESTY</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">How it Works</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Professionals</a>
            <a href="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">About</a>
          </nav>

          {/* Login Button */}
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105">
            Login
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header