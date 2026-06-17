import React, { useState, useEffect } from 'react';

function StatusTracker() {
  const [complaints, setComplaints] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetch('/api/complaints')
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(() => {});
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/complaints/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();
    setComplaints(complaints.map(c => (c._id === id ? updated : c)));
  };

  const steps = [
    { key: 'pending', label: 'Submitted', icon: '📝' },
    { key: 'in-progress', label: 'In Progress', icon: '🔧' },
    { key: 'resolved', label: 'Resolved', icon: '✅' },
    { key: 'rejected', label: 'Rejected', icon: '❌' },
  ];

  const selected = complaints.find(c => c._id === selectedId) || complaints[0];

  return (
    <div>
      <h2>Status Tracker</h2>
      {complaints.length === 0 && <div className="empty-state"><h3>No complaints to track</h3></div>}
      {complaints.length > 0 && (
        <>
          <div className="card">
            <h3>Select Complaint</h3>
            <select value={selectedId || ''} onChange={e => setSelectedId(e.target.value)}>
              {complaints.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
            </select>
          </div>
          {selected && (
            <div className="card">
              <h3>{selected.title}</h3>
              <p style={{ color: '#888', marginBottom: 15 }}>{selected.description}</p>
              <div className="timeline-view">
                {steps.map((step, i) => {
                  const statusOrder = ['pending', 'in-progress', 'resolved', 'rejected'];
                  const currentIdx = statusOrder.indexOf(selected.status);
                  const stepIdx = statusOrder.indexOf(step.key);
                  let state = 'pending-state';
                  if (stepIdx < currentIdx || (selected.status === step.key)) state = 'completed';
                  if (selected.status === step.key && step.key !== 'resolved') state = 'active';
                  if (step.key === 'rejected' && selected.status !== 'rejected') state = 'pending-state';

                  return (
                    <div key={step.key} className="timeline-step">
                      <div className={`timeline-icon ${state}`}>{step.icon}</div>
                      <div className="timeline-content">
                        <h4>{step.label}</h4>
                        {selected.status === step.key && <p>Current status</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                {steps.slice(0, 3).map(step => (
                  <button key={step.key} className={`btn ${selected.status === step.key ? 'btn-success' : 'btn-secondary'}`} onClick={() => updateStatus(selected._id, step.key)}>
                    Mark {step.label}
                  </button>
                ))}
                {selected.status !== 'rejected' && (
                  <button className="btn btn-danger" onClick={() => updateStatus(selected._id, 'rejected')}>Reject</button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default StatusTracker;
