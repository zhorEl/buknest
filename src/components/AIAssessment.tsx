import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, ArrowRight, Calendar, Users } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIAssessmentProps {
  onPageChange: (page: string) => void;
}

export default function AIAssessment({ onPageChange }: AIAssessmentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm here to help you understand your child's needs better. This assessment is completely free and doesn't require registration. Let's start with some basic information about your child.",
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      type: 'ai',
      content: "What is your child's age, and what specific concerns or challenges have you noticed?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let aiResponse = '';
      const messageCount = messages.filter(m => m.type === 'user').length;
      
      if (messageCount === 1) {
        aiResponse = "Thank you for sharing that information. Can you tell me more about your child's communication abilities? For example, do they use words, gestures, or other ways to express their needs?";
      } else if (messageCount === 2) {
        aiResponse = "I understand. How does your child interact with others? Do they make eye contact, respond to their name, or show interest in playing with other children?";
      } else if (messageCount === 3) {
        aiResponse = "That's helpful information. Are there any specific activities or situations that seem particularly challenging for your child? For example, transitions, loud noises, or changes in routine?";
      } else if (messageCount === 4) {
        // Complete assessment
        setAssessmentComplete(true);
        setAssessmentResults({
          concerns: ['Communication delays', 'Social interaction challenges', 'Sensory sensitivities'],
          recommendations: ['Speech therapy evaluation', 'Occupational therapy assessment', 'Developmental pediatrician consultation'],
          severity: 'moderate',
          suggestedProfessionals: ['Speech Therapist', 'Occupational Therapist', 'Developmental Pediatrician']
        });
        aiResponse = "Thank you for providing this detailed information. Based on our conversation, I've prepared a comprehensive assessment summary for you. This will help you understand your child's needs and connect with the right professionals.";
      } else {
        aiResponse = "I understand. Is there anything else you'd like to share about your child's development or behavior?";
      }

      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(inputMessage);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Pre-Assessment</h1>
          <p className="text-gray-600">Free, confidential assessment to understand your child's needs</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Assessment Results */}
          {assessmentComplete && assessmentResults && (
            <div className="border-t border-gray-200 p-6 bg-blue-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Summary</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Concerns Identified:</h4>
                  <ul className="space-y-1">
                    {assessmentResults.concerns.map((concern: string, index: number) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                        {concern}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recommended Professionals:</h4>
                  <ul className="space-y-1">
                    {assessmentResults.suggestedProfessionals.map((professional: string, index: number) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                        {professional}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onPageChange('professionals')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Find Professionals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button
                  onClick={() => onPageChange('bookings')}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-blue-600 flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Consultation
                </button>
              </div>
            </div>
          )}

          {/* Input Area */}
          {!assessmentComplete && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-4">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your response here..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>This assessment is for informational purposes only and does not replace professional medical advice.</p>
        </div>
      </div>
    </div>
  );
}