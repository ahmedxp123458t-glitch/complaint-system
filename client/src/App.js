import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ComplaintForm from './components/ComplaintForm';
import ComplaintList from './components/ComplaintList';
import StatusTracker from './components/StatusTracker';
import DepartmentPanel from './components/DepartmentPanel';
import Analytics from './components/Analytics';
import Notifications from './components/Notifications';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('list');

  const renderView = () => {
    switch (activeView) {
      case 'submit': return <ComplaintForm />;
      case 'list': return <ComplaintList />;
      case 'tracker': return <StatusTracker />;
      case 'departments': return <DepartmentPanel />;
      case 'analytics': return <Analytics />;
      case 'notifications': return <Notifications />;
      default: return <ComplaintList />;
    }
  };

  return (
    <div className="app">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
