import React, { useState, useEffect } from 'react';

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const query = filter ? `?status=${filter}` : '';
    fetch(`/api/complaints${query}`)
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(() => {});
  }, [filter]);

  const deleteComplaint = async (id) => {
    await fetch(`/api/complaints/${id}`, { method: 'DELETE' });
    setComplaints(complaints.filter(c => c._id !== id));
  };

  return (
    <div>
      <h2>Complaints</h2>
      <div className="card" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <label>Filter: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: 200, marginBottom: 0 }}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="grid-3">
        {complaints.map(c => (
          <div key={c._id} className={`complaint-card ${c.status}`}>
            <h4>{c.title}</h4>
            <div className="meta">
              <span className={`status-badge status-${c.status}`}>{c.status}</span>
              <span className={`priority-badge priority-${c.priority}`} style={{ marginLeft: 8 }}>{c.priority}</span>
            </div>
            <p className="description">{c.description}</p>
            <div className="meta">
              Department: {c.department || 'Unassigned'} &middot; {new Date(c.createdAt).toLocaleDateString()}
            </div>
            <button className="btn btn-danger" style={{ marginTop: 8 }} onClick={() => deleteComplaint(c._id)}>Delete</button>
          </div>
        ))}
        {complaints.length === 0 && <div className="empty-state"><h3>No complaints found</h3></div>}
      </div>
    </div>
  );
}

export default ComplaintList;
