import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Save, X, ChevronDown, Activity, Calendar, User, Target, Clock, Award, BookOpen, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useInterventionCategories, useInterventions, useChildInterventions } from '../hooks/useInterventions';
import { useChildren } from '../hooks/useChildren';

interface InterventionsPageProps {
  user: any;
  onPageChange: (page: string) => void;
}

export default function InterventionsPage({ user, onPageChange }: InterventionsPageProps) {
  const { categories, loading: categoriesLoading } = useInterventionCategories();
  const { interventions, loading: interventionsLoading } = useInterventions();
  const { children } = useChildren(user?.role === 'parent' ? user.id : null);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedIntervention, setSelectedIntervention] = useState<any>(null);

  const { childInterventions, refetch: refetchChildInterventions } = useChildInterventions(selectedChild);

  const filteredInterventions = interventions.filter(intervention => {
    const matchesSearch = intervention.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intervention.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || intervention.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddIntervention = async () => {
    if (!selectedChild || !selectedIntervention) {
      alert('Please select a child and intervention');
      return;
    }

    // This would typically call createChildIntervention from supabase
    console.log('Adding intervention:', {
      child_id: selectedChild,
      intervention_id: selectedIntervention.id,
      professional_id: user?.role === 'professional' ? user.id : null,
      status: 'active',
      goals: [],
      frequency: selectedIntervention.frequency_recommendation
    });

    setShowAddModal(false);
    setSelectedIntervention(null);
    refetchChildInterventions();
    alert('Intervention added successfully!');
  };

  if (categoriesLoading || interventionsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#CB748E] mx-auto mb-4"></div>
          <p className="text-gray-600 font-sans">Loading interventions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#d698ab] via-[#CB748E] to-[#698a60] text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute top-4 right-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-x-12"></div>
        <div className="absolute bottom-0 right-1/4 w-20 h-20 bg-white bg-opacity-10 rounded-full translate-y-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="flex justify-center items-center mb-6">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-4 mr-4">
              <Activity className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold font-handwritten">
                <span className="text-white">Interventions </span><span className="text-yellow-300">Library</span>
              </h1>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-white text-opacity-95 mb-4 font-sans">
              Evidence-based interventions for developmental support
            </p>
            <p className="text-lg md:text-xl text-white text-opacity-90 leading-relaxed font-sans">
              Explore our comprehensive library of therapeutic interventions designed to support children with special needs.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 border border-white border-opacity-50">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search interventions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans"
                />
              </div>
            </div>
            
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans appearance-none pr-10"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {user?.role === 'parent' && children.length > 0 && (
            <div className="mt-6">
              <label className="block text-sm font-bold text-gray-700 mb-3 font-sans">Select Child (Optional)</label>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="border-2 border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#CB748E] focus:border-transparent bg-white shadow-lg font-sans"
              >
                <option value="">View all interventions</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} (Age {child.age})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Categories Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white border-opacity-50 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: category.color }}
                ></div>
                <h3 className="text-lg font-bold text-gray-800 font-handwritten">{category.name}</h3>
              </div>
              <p className="text-sm text-gray-700 font-sans">{category.description}</p>
              <div className="mt-4 text-xs text-gray-600 font-sans">
                {interventions.filter(i => i.category_id === category.id).length} interventions
              </div>
            </div>
          ))}
        </div>

        {/* Active Child Interventions */}
        {selectedChild && childInterventions.length > 0 && (
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-10 border border-white border-opacity-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 font-handwritten">
              Active Interventions for {children.find(c => c.id === selectedChild)?.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {childInterventions.map((childIntervention: any) => (
                <div key={childIntervention.id} className="border border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-green-50 to-blue-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800 font-handwritten">{childIntervention.interventions?.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-bold font-sans ${
                      childIntervention.status === 'active' ? 'bg-green-100 text-green-800' :
                      childIntervention.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      childIntervention.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {childIntervention.status}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-700 font-sans">
                      <Calendar className="h-4 w-4 mr-2 text-[#698a60]" />
                      Started: {new Date(childIntervention.start_date).toLocaleDateString()}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-700 font-sans">
                      <User className="h-4 w-4 mr-2 text-[#CB748E]" />
                      {childIntervention.user_profiles?.full_name || 'No professional assigned'}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-700 font-sans">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      Frequency: {childIntervention.frequency}
                    </div>
                    
                    {childIntervention.effectiveness_rating && (
                      <div className="flex items-center text-sm text-gray-700 font-sans">
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        Effectiveness: {childIntervention.effectiveness_rating}/10
                      </div>
                    )}
                  </div>
                  
                  {childIntervention.goals && childIntervention.goals.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-bold text-gray-800 mb-2 font-handwritten">Current Goals:</h4>
                      <div className="space-y-1">
                        {childIntervention.goals.slice(0, 3).map((goal: string, index: number) => (
                          <div key={index} className="text-xs text-gray-700 flex items-center font-sans">
                            <Target className="h-3 w-3 mr-2 text-[#698a60]" />
                            {goal}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interventions Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredInterventions.map((intervention) => {
            const category = categories.find(cat => cat.id === intervention.category_id);
            return (
              <div key={intervention.id} className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-lg border border-white border-opacity-50 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: category?.color || '#6B7280' }}
                    ></div>
                    <h3 className="text-xl font-bold text-gray-800 font-handwritten">{intervention.name}</h3>
                  </div>
                  {intervention.abbreviation && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-bold font-sans">
                      {intervention.abbreviation}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed font-sans text-sm">{intervention.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-700 font-sans">
                    <User className="h-4 w-4 mr-2 text-[#CB748E]" />
                    Age Range: {intervention.age_range}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700 font-sans">
                    <Clock className="h-4 w-4 mr-2 text-[#698a60]" />
                    Duration: {intervention.session_duration_min}-{intervention.session_duration_max} min
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700 font-sans">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    Frequency: {intervention.frequency_recommendation}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-700 font-sans">
                    <Award className="h-4 w-4 mr-2 text-yellow-500" />
                    Evidence: {intervention.evidence_level}
                  </div>
                </div>
                
                {intervention.target_conditions && intervention.target_conditions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-800 mb-2 font-handwritten">Target Conditions:</h4>
                    <div className="flex flex-wrap gap-1">
                      {intervention.target_conditions.slice(0, 3).map((condition: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-pink-100 text-[#CB748E] text-xs rounded-full font-semibold font-sans"
                        >
                          {condition}
                        </span>
                      ))}
                      {intervention.target_conditions.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-semibold font-sans">
                          +{intervention.target_conditions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  {user?.role === 'parent' && children.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedIntervention(intervention);
                        setShowAddModal(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white px-4 py-3 rounded-2xl font-bold hover:from-pink-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center font-sans"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Plan
                    </button>
                  )}
                  <button className="px-4 py-3 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 text-gray-700 font-bold flex items-center font-sans">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredInterventions.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-white border-opacity-50 shadow-xl">
              <Activity className="h-20 w-20 text-[#CB748E] mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-handwritten">No interventions found</h3>
              <p className="text-gray-600 mb-6 font-sans">
                Try adjusting your search criteria to see more results.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white px-6 py-3 rounded-2xl font-bold hover:from-pink-500 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-handwritten"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Intervention Modal */}
      {showAddModal && selectedIntervention && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 font-handwritten">Add Intervention</h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedIntervention(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-8">
              <div className="mb-6 p-4 bg-gradient-to-r from-pink-50 to-green-50 rounded-2xl border border-pink-200">
                <h3 className="text-lg font-bold text-gray-800 mb-2 font-handwritten">{selectedIntervention.name}</h3>
                <p className="text-sm text-gray-700 font-sans">{selectedIntervention.description}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-gray-800 mb-3 font-handwritten">Select Child</label>
                  <div className="space-y-3">
                    {children.map((child) => (
                      <div
                        key={child.id}
                        onClick={() => setSelectedChild(child.id)}
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                          selectedChild === child.id
                            ? 'border-[#CB748E] bg-pink-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <img
                            src={child.avatar}
                            alt={child.name}
                            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 font-handwritten">{child.name}</h4>
                            <p className="text-sm text-gray-600 font-sans">Age {child.age}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {child.conditions.slice(0, 2).map((condition, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-pink-100 text-[#CB748E] text-xs rounded-full font-semibold font-sans"
                                >
                                  {condition}
                                </span>
                              ))}
                            </div>
                          </div>
                          {selectedChild === child.id && (
                            <CheckCircle className="h-6 w-6 text-[#CB748E]" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddIntervention}
                    disabled={!selectedChild}
                    className={`flex-1 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center font-handwritten ${
                      selectedChild
                        ? 'bg-gradient-to-r from-[#CB748E] to-[#698a60] text-white hover:from-pink-500 hover:to-green-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Intervention
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setSelectedIntervention(null);
                    }}
                    className="px-6 py-4 border-2 border-gray-300 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 text-gray-700 flex items-center justify-center font-handwritten"
                  >
                    <X className="h-5 w-5 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}