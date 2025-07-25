import React from 'react'
import { Heart, Shield, Users, Clock, Star, CheckCircle, ArrowRight, Baby, Stethoscope, BookOpen, Smile, Award, Globe } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full opacity-20 transform rotate-12"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-pink-300 opacity-30 transform rotate-45" style={{borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'}}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-purple-300 opacity-25 transform -rotate-12" style={{borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%'}}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-amber-300 opacity-20 rounded-full"></div>
        
        {/* Floating elements */}
        <div className="absolute top-40 left-1/3 w-4 h-4 bg-pink-400 rounded-full opacity-40 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-60 right-1/3 w-3 h-3 bg-green-400 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/2 w-5 h-5 bg-purple-400 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1.5s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Logo illustration */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mb-8 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center">
                <Baby className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-purple-800 mb-4 font-handwritten">
              BUKNEST
            </h1>
            
            <p className="text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              "Supporting Every Child with Special Care"
            </p>
            
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              A nurturing platform dedicated to providing specialized care and support for children with unique needs, 
              connecting families with compassionate professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Find Care Now
              </button>
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold border-2 border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-md">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Illustration of children */}
          <div className="mt-16 flex justify-center">
            <div className="relative">
              <div className="flex space-x-4 items-end">
                {/* Child figures represented as colorful circles with simple faces */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full flex items-center justify-center mb-2 shadow-lg">
                    <Smile className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-12 h-8 bg-pink-200 rounded-full"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-18 h-18 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full flex items-center justify-center mb-2 shadow-lg">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-14 h-10 bg-amber-200 rounded-full"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-300 to-green-400 rounded-full flex items-center justify-center mb-2 shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-12 h-8 bg-green-200 rounded-full"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full flex items-center justify-center mb-2 shadow-lg">
                    <Smile className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-12 h-8 bg-purple-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-800 mb-4 font-handwritten">Our Special Care</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated support tailored for children with unique needs and their families
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-pink-700 mb-4 font-handwritten">Compassionate Care</h3>
              <p className="text-pink-600 leading-relaxed">
                Personalized attention and understanding for each child's unique journey and needs
              </p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4 font-handwritten">Expert Specialists</h3>
              <p className="text-purple-600 leading-relaxed">
                Certified professionals specializing in developmental, behavioral, and therapeutic care
              </p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4 font-handwritten">Community Support</h3>
              <p className="text-green-600 leading-relaxed">
                A supportive community of families and resources available whenever you need them
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-800 mb-4 font-handwritten">How We Help</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our caring approach to supporting your child's development
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-pink-700 mb-4 font-handwritten">Connect & Assess</h3>
              <p className="text-pink-600 leading-relaxed">
                Share your child's story and let us understand their unique needs and strengths
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-purple-700 mb-4 font-handwritten">Match & Plan</h3>
              <p className="text-purple-600 leading-relaxed">
                We match you with the right specialists and create a personalized care plan
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4 font-handwritten">Grow & Thrive</h3>
              <p className="text-gray-600 leading-relaxed">
                Begin the journey of growth with ongoing support and celebrate every milestone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-800 mb-4 font-handwritten">Making a Difference</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Together, we're creating positive change in children's lives every day
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-pink-600 mb-2">2K+</div>
              <div className="text-pink-700 font-medium">Children Supported</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
              <div className="text-purple-700 font-medium">Care Specialists</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">4.8</div>
              <div className="text-green-700 font-medium">Family Rating</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-amber-600 mb-2">5K+</div>
              <div className="text-amber-700 font-medium">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 opacity-50" style={{borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'}}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Every Child Deserves Special Care
          </h2>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            Join our caring community and give your child the specialized support they deserve
          </p>
          <button className="bg-white text-purple-600 px-10 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
            Start Your Journey <ArrowRight className="inline-block w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage