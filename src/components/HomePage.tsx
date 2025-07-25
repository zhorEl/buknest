import React from 'react';
import { MessageCircle, Users, Calendar, Star, ArrowRight, Shield, Clock, Heart } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Pre-Assessment',
      description: 'Get instant insights about your child\'s needs through our AI-powered assessment tool.',
      action: () => onPageChange('assessment'),
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Expert Professionals',
      description: 'Connect with certified speech therapists, occupational therapists, and special education teachers.',
      action: () => onPageChange('professionals'),
      color: 'bg-green-500'
    },
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Schedule home visits or online consultations that fit your family\'s schedule.',
      action: () => onPageChange('bookings'),
      color: 'bg-purple-500'
    }
  ];

  const stats = [
    { label: 'Certified Professionals', value: '500+' },
    { label: 'Families Helped', value: '10,000+' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Cities Covered', value: '50+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Organic Hero Section */}
      <div className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 overflow-hidden min-h-screen">
        {/* Organic Background Shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-30 -translate-x-32 -translate-y-32"></div>
        <div className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-25 translate-x-32"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 translate-y-32"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full opacity-25"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-32 left-20 w-4 h-4 bg-pink-300 rounded-full opacity-60"></div>
        <div className="absolute top-40 left-32 w-3 h-3 bg-purple-300 rounded-full opacity-50"></div>
        <div className="absolute top-28 left-40 w-2 h-2 bg-orange-300 rounded-full opacity-70"></div>
        <div className="absolute top-60 right-32 w-5 h-5 bg-pink-300 rounded-full opacity-40"></div>
        <div className="absolute top-80 right-20 w-3 h-3 bg-purple-300 rounded-full opacity-60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            {/* Brand Logo */}
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg border border-white border-opacity-50">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center">
                  <Heart className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            
            {/* Brand Name */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-purple-800 mb-4 leading-tight tracking-tight font-handwritten">
              BukNEST
            </h1>
            
            {/* Tagline */}
            <div className="text-2xl md:text-3xl lg:text-4xl font-medium text-purple-600 mb-8 font-handwritten">
              <span className="inline-block mx-2">Safe.</span>
              <span className="inline-block mx-2">Smart.</span>
              <span className="inline-block mx-2">Supportive.</span>
            </div>
            
            {/* Main Description */}
            <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-3xl p-8 mb-12 max-w-4xl mx-auto border border-white border-opacity-50">
              <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4 font-handwritten">
                A safe nest for every child with special needs
              </h2>
              <p className="text-lg md:text-xl text-purple-700 leading-relaxed font-readable">
                Connect with certified professionals who understand your child's unique journey. 
                Get AI-powered guidance, book consultations, and track progress in a warm, supportive environment.
              </p>
            </div>
            
            {/* How It Works Preview */}
            <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-3xl p-8 mb-12 max-w-5xl mx-auto border border-white border-opacity-50">
              <h3 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 font-handwritten">How it works?</h3>
              <p className="text-lg text-purple-600 mb-8 font-readable">Smart. Safe. Supportive.</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100">
                  <div className="w-12 h-12 bg-pink-300 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-white font-bold font-handwritten">1</span>
                  </div>
                  <h4 className="font-bold text-purple-800 mb-2 font-handwritten">Parent Engagement</h4>
                  <p className="text-sm text-purple-700 font-readable">Share concerns through our conversational AI chatbot</p>
                </div>
                
                <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                  <div className="w-12 h-12 bg-purple-300 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-white font-bold font-handwritten">2</span>
                  </div>
                  <h4 className="font-bold text-purple-800 mb-2 font-handwritten">AI Initial Support</h4>
                  <p className="text-sm text-purple-700 font-readable">Get personalized insights and expert recommendations</p>
                </div>
                
                <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 md:col-span-2 lg:col-span-1">
                  <div className="w-12 h-12 bg-orange-300 rounded-full mb-4 flex items-center justify-center">
                    <span className="text-white font-bold font-handwritten">3</span>
                  </div>
                  <h4 className="font-bold text-purple-800 mb-2 font-handwritten">Expert Connection</h4>
                  <p className="text-sm text-purple-700 font-readable">Book with verified professionals for ongoing support</p>
                </div>
              </div>
            </div>
            
            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <button
                onClick={() => onPageChange('assessment')}
                className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center font-handwritten"
              >
                Start Free Assessment
                <ArrowRight className="ml-3 h-6 w-6" />
              </button>
              <button
                onClick={() => onPageChange('professionals')}
                className="bg-white bg-opacity-80 backdrop-blur-sm border-2 border-purple-300 text-purple-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-opacity-100 transition-all duration-300 transform hover:scale-105 font-handwritten"
              >
                Find Professionals
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-50">
                  <div className="text-2xl md:text-3xl font-bold text-purple-800 mb-2 font-handwritten">{stat.value}</div>
                  <div className="text-purple-600 text-sm md:text-base font-handwritten">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Start Section */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-15 -translate-x-40 translate-y-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6 font-handwritten">Starting Where It Matters Most</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 border border-white border-opacity-50">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-pink-300 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-purple-800 font-handwritten">Why Start Here?</h3>
                </div>
                <ul className="space-y-3 text-purple-700 font-readable">
                  <li>• 1 in 6 children may have developmental delays, but access to specialists remains limited</li>
                  <li>• Many parents feel lost and unsupported, especially in underserved areas</li>
                </ul>
              </div>
              
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 border border-white border-opacity-50">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-300 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-purple-800 font-handwritten">BukNEST bridges that gap:</h3>
                </div>
                <ul className="space-y-3 text-purple-700 font-readable">
                  <li>• AI-powered guidance available 24/7</li>
                  <li>• Connects parents to <strong>local or regional experts</strong></li>
                  <li>• Promotes awareness, early action, and community support</li>
                </ul>
              </div>
              
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 border border-white border-opacity-50">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-300 rounded-full mr-3"></div>
                  <h3 className="text-xl font-bold text-purple-800 font-handwritten">The Vision Ahead</h3>
                </div>
                <ul className="space-y-3 text-purple-700 font-readable">
                  <li>• Pilot with real families</li>
                  <li>• Validate impact with real families</li>
                  <li>• Scale gradually to other underserved areas</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl p-8 border border-white border-opacity-50 max-w-md">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="h-16 w-16 text-purple-600" />
                  </div>
                  <h4 className="text-xl font-bold text-purple-800 mb-4 font-handwritten">Join Our Community</h4>
                  <p className="text-purple-700 mb-6 font-readable">Be part of a supportive network of families and professionals</p>
                  <button
                    onClick={() => onPageChange('assessment')}
                    className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-2xl font-semibold hover:from-pink-500 hover:to-purple-500 transition-all duration-300 font-handwritten"
                  >
                    Get Started Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 left-0 w-48 h-48 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 -translate-x-24"></div>
        <div className="absolute bottom-20 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-15 translate-x-32"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6 font-handwritten">How We Support Your Family</h2>
            <p className="text-xl text-purple-600 max-w-3xl mx-auto font-readable">Comprehensive care through our innovative platform</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colors = [
                { bg: 'from-pink-400 to-purple-400', card: 'from-pink-50 to-purple-50' },
                { bg: 'from-purple-400 to-indigo-400', card: 'from-purple-50 to-indigo-50' },
                { bg: 'from-orange-400 to-pink-400', card: 'from-orange-50 to-pink-50' }
              ];
              return (
                <div key={index} className={`bg-gradient-to-br ${colors[index].card} rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white border-opacity-50`}>
                  <div className={`bg-gradient-to-br ${colors[index].bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-purple-800 mb-4 font-handwritten">{feature.title}</h3>
                  <p className="text-purple-700 mb-8 leading-relaxed font-readable">{feature.description}</p>
                  <button
                    onClick={feature.action}
                    className="text-purple-600 font-bold hover:text-purple-700 flex items-center group transition-colors font-handwritten"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-25"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-6 font-handwritten">Trusted by Families</h2>
            <p className="text-xl text-purple-600 max-w-3xl mx-auto font-readable">Your child's safety and progress are our top priorities</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-white bg-opacity-80 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white border-opacity-50">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4 font-handwritten">Verified Professionals</h3>
              <p className="text-purple-700 text-lg font-readable">All therapists are licensed and background-checked</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-80 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white border-opacity-50">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4 font-handwritten">24/7 Support</h3>
              <p className="text-purple-700 text-lg font-readable">Round-the-clock assistance for your family</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-80 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white border-opacity-50">
                <Star className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4 font-handwritten">Proven Results</h3>
              <p className="text-purple-700 text-lg font-readable">95% of families see improvement within 3 months</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}