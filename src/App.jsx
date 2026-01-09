import React, { useState } from 'react';
import { GoalProvider } from './context/GoalContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import GoalsList from './components/GoalsList';
import ProfileView from './components/ProfileView';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('goals'); // 'goals' | 'profile'

  return (
    <LanguageProvider>
      <GoalProvider>
        <Layout
          currentView={currentView}
          onProfileClick={() => setCurrentView('profile')}
        >
          {currentView === 'goals' ? (
            <GoalsList />
          ) : (
            <ProfileView onBack={() => setCurrentView('goals')} />
          )}
        </Layout>
      </GoalProvider>
    </LanguageProvider>
  )
}

export default App;
