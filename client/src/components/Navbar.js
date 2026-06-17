import React from 'react';

function Navbar({ activeView, setActiveView }) {
  const links = [
    { id: 'submit', label: 'Submit Complaint' },
    { id: 'list', label: 'Complaints' },
    { id: 'tracker', label: 'Status Tracker' },
    { id: 'departments', label: 'Departments' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'notifications', label: 'Notifications' },
  ];

  return (
    <nav className="navbar">
      <h2>Complaint System</h2>
      <ul>
        {links.map(link => (
          <li key={link.id} className={activeView === link.id ? 'active' : ''} onClick={() => setActiveView(link.id)}>
            {link.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
