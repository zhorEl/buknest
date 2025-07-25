import React from 'react'
import { Heart, Star, ArrowRight, Baby, Stethoscope, Smile, Award, Globe, Users, Shield, Clock } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-400/20 rounded-full transform rotate-12 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-pink-300/30 transform rotate-45 animate-bounce" style={{borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', animationDuration: '3s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-purple-300/25 transform -rotate-12 animate-pulse" style={{borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%', animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-amber-300/20 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
        
        {/* Floating elements */}
        <div className="absolute top-40 left-1/3 w-4 h-4 bg-pink-400/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-60 right-1/3 w-3 h-3 bg-green-400/40 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/2 w-5 h-5 bg-purple-400/40 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            {/* Logo illustration */}
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mb-8 shadow-xl animate-pulse">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center shadow-inner">
                <Baby className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-purple-800 mb-6 font-handwritten tracking-wide">
              BUKNEST
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
              "Supporting Every Child with Special Care"
            </p>
            
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              A nurturing platform dedicated to providing specialized care and support for children with unique needs, 
              connecting families with compassionate professionals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-10 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                Find Care Now
              </button>
              <button className="bg-white/80 backdrop-blur-sm text-purple-600 px-10 py-4 rounded-full font-semibold border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Illustration of children */}
          <div className="mt-20 flex justify-center">
            <div className="relative">
              <div className="flex flex-wrap justify-center gap-6 items-end">
                {/* Child figures represented as colorful circles with simple faces */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full flex items-center justify-center mb-3 shadow-xl hover:scale-110 transition-transform duration-300">
                    <Smile className="w-10 h-10 text-white" />
                  </div>
                  <div className="w-16 h-10 bg-pink-200/80 rounded-full shadow-md"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-300 to-amber-400 rounded-full flex items-center justify-center mb-3 shadow-xl hover:scale-110 transition-transform duration-300">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <div className="w-20 h-12 bg-amber-200/80 rounded-full shadow-md"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-300 to-green-400 rounded-full flex items-center justify-center mb-3 shadow-xl hover:scale-110 transition-transform duration-300">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <div className="w-16 h-10 bg-green-200/80 rounded-full shadow-md"></div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full flex items-center justify-center mb-3 shadow-xl hover:scale-110 transition-transform duration-300">
                    <Smile className="w-10 h-10 text-white" />
                  </div>
                  <div className="w-16 h-10 bg-purple-200/80 rounded-full shadow-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/90 backdrop-blur-md relative">
        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-green-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-pink-200/20 animate-bounce" style={{borderRadius: '50% 60% 40% 70% / 60% 40% 70% 50%', animationDuration: '4s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-purple-800 mb-6 font-handwritten">Our Special Care</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dedicated support tailored for children with unique needs and their families
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-pink-700 mb-6 font-handwritten">Compassionate Care</h3>
              <p className="text-pink-600 leading-relaxed text-lg">
                Personalized attention and understanding for each child's unique journey and needs
              </p>
            </div>
            
            <div className="text-center p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-purple-700 mb-6 font-handwritten">Expert Specialists</h3>
              <p className="text-purple-600 leading-relaxed text-lg">
                Certified professionals specializing in developmental, behavioral, and therapeutic care
              </p>
            </div>
            
            <div className="text-center p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 group">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Globe className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-green-700 mb-6 font-handwritten">Community Support</h3>
              <p className="text-green-600 leading-relaxed text-lg">
                A supportive community of families and resources available whenever you need them
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-green-50 relative">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-20 w-36 h-36 bg-purple-200/20 animate-pulse" style={{borderRadius: '70% 30% 60% 40% / 50% 70% 30% 50%'}}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-green-200/20 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-purple-800 mb-6 font-handwritten">How We Help</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our caring approach to supporting your child's development
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white font-bold text-3xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                1
              </div>
              <h3 className="text-3xl font-bold text-pink-700 mb-6 font-handwritten">Connect & Assess</h3>
              <p className="text-pink-600 leading-relaxed text-lg">
                Share your child's story and let us understand their unique needs and strengths
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white font-bold text-3xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                2
              </div>
              <h3 className="text-3xl font-bold text-purple-700 mb-6 font-handwritten">Match & Plan</h3>
              <p className="text-purple-600 leading-relaxed text-lg">
                We match you with the right specialists and create a personalized care plan
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white font-bold text-3xl shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                3
              </div>
              <h3 className="text-3xl font-bold text-green-700 mb-6 font-handwritten">Grow & Thrive</h3>
              <p className="text-green-600 leading-relaxed text-lg">
                Begin the journey of growth with ongoing support and celebrate every milestone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white/95 backdrop-blur-md relative">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-amber-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-pink-200/20 animate-bounce" style={{borderRadius: '60% 40% 70% 30% / 40% 60% 30% 70%', animationDuration: '4s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-purple-800 mb-6 font-handwritten">Making a Difference</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Together, we're creating positive change in children's lives every day
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Baby className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-pink-600 mb-3 font-handwritten">2K+</div>
              <div className="text-pink-700 font-semibold text-lg">Children Supported</div>
            </div>
            
            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-3 font-handwritten">150+</div>
              <div className="text-purple-700 font-semibold text-lg">Care Specialists</div>
            </div>
            
            <div className="p-8 rounded-3xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-3 font-handwritten">4.8</div>
              <div className="text-green-700 font-semibold text-lg">Family Rating</div>
            </div>
            
            <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-amber-600 mb-3 font-handwritten">5K+</div>
              <div className="text-amber-700 font-semibold text-lg">Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 opacity-50 animate-bounce" style={{borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', animationDuration: '4s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 font-handwritten">
            Every Child Deserves Special Care
          </h2>
          <p className="text-xl md:text-2xl text-purple-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join our caring community and give your child the specialized support they deserve
          </p>
          <button className="bg-white text-purple-600 px-12 py-5 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
            Start Your Journey <ArrowRight className="inline-block w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage