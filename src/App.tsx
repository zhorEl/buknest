import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import HomePage from './components/HomePage';
import AIAssessment from './components/AIAssessment';
import AboutPage from './components/AboutPage';
import MissionPage from './components/MissionPage';
import ProfessionalsPage from './components/ProfessionalsPage';
import BookingsPage from './components/BookingsPage';
import ParentDashboard from './components/dashboards/ParentDashboard';
import ProfessionalDashboard from './components/dashboards/ProfessionalDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = (userData: any) => {
    setUser(userData);
    // Redirect to appropriate dashboard based on user role
    if (userData.role === 'parent') {
      setCurrentPage('parent-dashboard');
    } else if (userData.role === 'professional') {
      setCurrentPage('professional-dashboard');
    } else if (userData.role === 'admin') {
      setCurrentPage('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    // If user is logged in, show their dashboard by default
    if (user && currentPage === 'home') {
      if (user.role === 'parent') {
        return <ParentDashboard user={user} onPageChange={setCurrentPage} />;
      } else if (user.role === 'professional') {
        return <ProfessionalDashboard user={user} onPageChange={setCurrentPage} />;
      } else if (user.role === 'admin') {
        return <AdminDashboard user={user} onPageChange={setCurrentPage} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'assessment':
        return <AIAssessment onPageChange={setCurrentPage} />;
      case 'about':
        return <AboutPage onPageChange={setCurrentPage} />;
      case 'mission':
        return <MissionPage onPageChange={setCurrentPage} />;
      case 'professionals':
        return <ProfessionalsPage onPageChange={setCurrentPage} />;
      case 'bookings':
        return <BookingsPage onPageChange={setCurrentPage} />;
      case 'parent-dashboard':
        return <ParentDashboard user={user} onPageChange={setCurrentPage} />;
      case 'professional-dashboard':
        return <ProfessionalDashboard user={user} onPageChange={setCurrentPage} />;
      case 'admin-dashboard':
        return <AdminDashboard user={user} onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        user={user}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      {renderPage()}
    </div>
  );
}

export default App;
