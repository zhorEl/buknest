import React from 'react'
import { Heart, Shield, Users, Clock, Star, CheckCircle, ArrowRight, Baby, Stethoscope, BookOpen } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 to-rose-50 py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-300 rounded-full opacity-25"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-400 to-rose-300 rounded-full mb-8">
              <span className="text-3xl font-bold text-white font-handwritten">N</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-pink-800 mb-6 font-handwritten">
              Welcome to <span className="text-green-600">NESTY</span>
            </h1>
            
            <p className="text-xl text-pink-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              AI-powered child care platform connecting families with verified professionals. 
              Get instant assessments, personalized recommendations, and book trusted specialists.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Free Assessment
              </button>
              <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-all duration-300">
                Find Professionals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose NESTY?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive child care solutions powered by AI and trusted by families worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">AI Assessment</h3>
              <p className="text-green-600 leading-relaxed">
                Get instant, comprehensive child development assessments using our advanced AI technology
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-pink-50 to-rose-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-pink-700 mb-4">Verified Experts</h3>
              <p className="text-pink-600 leading-relaxed">
                Connect with certified child development professionals and specialists in your area
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">24/7 Support</h3>
              <p className="text-green-600 leading-relaxed">
                Round-the-clock support and guidance for all your child care needs and concerns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How NESTY Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to get the best care for your child
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Take Assessment</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete our comprehensive AI-powered assessment to understand your child's needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive personalized recommendations and connect with suitable professionals
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Book & Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Schedule sessions and start your child's journey to better development
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Trusted by Families</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of families who trust NESTY for their child care needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Children Assessed</div>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-pink-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Professionals</div>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">4.9</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-pink-600 mb-2">25K+</div>
              <div className="text-gray-600">Sessions Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Give Your Child the Best Care?
          </h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Start with a free AI assessment and connect with trusted professionals today
          </p>
          <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Now <ArrowRight className="inline-block w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage