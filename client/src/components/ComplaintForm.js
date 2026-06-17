import React, { useState, useEffect } from 'react';

function ComplaintForm() {
  const [departments, setDepartments] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [priority, setPriority] = useState('medium');
  const [userId] = useState('user1');

  useEffect(() => {
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(() => {});
  }, []);

  const submitComplaint = async () => {
    if (!title) return;
    await fetch('/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, title, description, department, priority }),
    });
    await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, message: `Complaint submitted: ${title}`, read: false }),
    });
    setTitle(''); setDescription(''); setDepartment(''); setPriority('medium');
    alert('Complaint submitted!');
  };

  return (
    <div>
      <h2>Submit a Complaint</h2>
      <div className="card">
        <div className="form-group">
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Brief title" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Detailed description of the issue" />
        </div>
        <div className="grid-2">
          <div className="form-group">
            <label>Department</label>
            <select value={department} onChange={e => setDepartment(e.target.value)}>
              <option value="">Select department...</option>
              {departments.map(d => <option key={d._id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary" onClick={submitComplaint}>Submit Complaint</button>
      </div>
    </div>
  );
}

export default ComplaintForm;
