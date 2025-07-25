import React from 'react'
import { Heart, Star, ArrowRight, Baby, Users, Award } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-green-50 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-300 opacity-30 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300 opacity-40 rounded-3xl rotate-45"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-purple-300 opacity-35 rounded-2xl"></div>
        
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mb-8 shadow-lg">
            <Baby className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-purple-800 mb-6">
            BUKNEST
          </h1>
          
          <p className="text-2xl text-gray-700 mb-8 font-medium">
            "Supporting Every Child with Special Care"
          </p>
          
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            A nurturing platform dedicated to providing specialized care and support for children with unique needs, 
            connecting families with compassionate professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg">
              Find Care Now
            </button>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold border-2 border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-800 mb-4">Our Special Care</h2>
            <p className="text-xl text-gray-600">
              Dedicated support tailored for children with unique needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-pink-700 mb-4">Compassionate Care</h3>
              <p className="text-pink-600">
                Personalized attention and understanding for each child's unique journey
              </p>
            </div>
            
            <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Expert Specialists</h3>
              <p className="text-purple-600">
                Certified professionals specializing in developmental and therapeutic care
              </p>
            </div>
            
            <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">Community Support</h3>
              <p className="text-green-600">
                A supportive community of families and resources available when needed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-800 mb-4">Making a Difference</h2>
            <p className="text-xl text-gray-600">
              Together, we're creating positive change in children's lives
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-3xl bg-white shadow-lg">
              <div className="text-3xl font-bold text-pink-600 mb-2">2K+</div>
              <div className="text-pink-700 font-semibold">Children Supported</div>
            </div>
            
            <div className="p-6 rounded-3xl bg-white shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-purple-700 font-semibold">Care Specialists</div>
            </div>
            
            <div className="p-6 rounded-3xl bg-white shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
              <div className="text-green-700 font-semibold">Family Rating</div>
            </div>
            
            <div className="p-6 rounded-3xl bg-white shadow-lg">
              <div className="text-3xl font-bold text-amber-600 mb-2">5K+</div>
              <div className="text-amber-700 font-semibold">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Every Child Deserves Special Care
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join our caring community and give your child the specialized support they deserve
          </p>
          <button className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl">
            Start Your Journey <ArrowRight className="inline-block w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage