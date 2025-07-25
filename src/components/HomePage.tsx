import React from 'react'
import { Heart, Star, ArrowRight, Baby, Stethoscope, Smile, Award, Globe, Users, Shield, Clock } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-pink-300 opacity-30 rounded-3xl rotate-45 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-purple-300 opacity-25 rounded-2xl -rotate-12 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-amber-300 opacity-20 rounded-full animate-bounce"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            {/* Logo illustration */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mb-8 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                <Baby className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-purple-800 mb-6 font-serif">
              BUKNEST
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto font-medium">
              "Supporting Every Child with Special Care"
            </p>
            
            <p className="text-base md:text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              A nurturing platform dedicated to providing specialized care and support for children with unique needs, 
              connecting families with compassionate professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Find Care Now
              </button>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-lg">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Illustration of children */}
          <div className="mt-16 flex justify-center">
            <div className="flex flex-wrap justify-center gap-6 items-end">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform duration-300">
                  <Smile className="w-8 h-8 text-white" />
                </div>
                <div className="w-12 h-8 bg-pink-200 rounded-full shadow-md"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="w-16 h-10 bg-amber-200 rounded-full shadow-md"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-300 to-green-400 rounded-full flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="w-12 h-8 bg-green-200 rounded-full shadow-md"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform duration-300">
                  <Smile className="w-8 h-8 text-white" />
                </div>
                <div className="w-12 h-8 bg-purple-200 rounded-full shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white relative">
        <div className="absolute top-10 right-10 w-32 h-32 bg-green-200 opacity-20 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-pink-200 opacity-20 rounded-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4 font-serif">Our Special Care</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated support tailored for children with unique needs and their families
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-pink-700 mb-4 font-serif">Compassionate Care</h3>
              <p className="text-pink-600 leading-relaxed">
                Personalized attention and understanding for each child's unique journey and needs
              </p>
            </div>
            
            <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4 font-serif">Expert Specialists</h3>
              <p className="text-purple-600 leading-relaxed">
                Certified professionals specializing in developmental, behavioral, and therapeutic care
              </p>
            </div>
            
            <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4 font-serif">Community Support</h3>
              <p className="text-green-600 leading-relaxed">
                A supportive community of families and resources available whenever you need them
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 relative">
        <div className="absolute top-20 left-20 w-28 h-28 bg-purple-200 opacity-20 rounded-3xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-green-200 opacity-20 rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4 font-serif">How We Help</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Our caring approach to supporting your child's development
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg hover:scale-110 transition-transform duration-300">
                1
              </div>
              <h3 className="text-2xl font-bold text-pink-700 mb-4 font-serif">Connect & Assess</h3>
              <p className="text-pink-600 leading-relaxed">
                Share your child's story and let us understand their unique needs and strengths
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg hover:scale-110 transition-transform duration-300">
                2
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4 font-serif">Match & Plan</h3>
              <p className="text-purple-600 leading-relaxed">
                We match you with the right specialists and create a personalized care plan
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg hover:scale-110 transition-transform duration-300">
                3
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4 font-serif">Grow & Thrive</h3>
              <p className="text-green-600 leading-relaxed">
                Begin the journey of growth with ongoing support and celebrate every milestone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white relative">
        <div className="absolute top-10 left-1/4 w-24 h-24 bg-amber-200 opacity-20 rounded-full"></div>
        <div className="absolute bottom-10 right-1/4 w-20 h-20 bg-pink-200 opacity-20 rounded-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4 font-serif">Making a Difference</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Together, we're creating positive change in children's lives every day
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-pink-600 mb-2 font-serif">2K+</div>
              <div className="text-pink-700 font-semibold">Children Supported</div>
            </div>
            
            <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2 font-serif">150+</div>
              <div className="text-purple-700 font-semibold">Care Specialists</div>
            </div>
            
            <div className="p-6 rounded-3xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2 font-serif">4.8</div>
              <div className="text-green-700 font-semibold">Family Rating</div>
            </div>
            
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-amber-600 mb-2 font-serif">5K+</div>
              <div className="text-amber-700 font-semibold">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 relative overflow-hidden">
        <div className="absolute top-10 left-10 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-10 rounded-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-5 rounded-full"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
            Every Child Deserves Special Care
          </h2>
          <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Join our caring community and give your child the specialized support they deserve
          </p>
          <button className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
            Start Your Journey <ArrowRight className="inline-block w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage