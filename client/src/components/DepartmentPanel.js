import React, { useState, useEffect } from 'react';

function DepartmentPanel() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [head, setHead] = useState('');

  useEffect(() => {
    fetch('/api/departments')
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(() => {});
  }, []);

  const addDepartment = async () => {
    if (!name) return;
    const res = await fetch('/api/departments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, head }),
    });
    const d = await res.json();
    setDepartments([...departments, d]);
    setName(''); setHead('');
  };

  const deleteDepartment = async (id) => {
    await fetch(`/api/departments/${id}`, { method: 'DELETE' });
    setDepartments(departments.filter(d => d._id !== id));
  };

  const assignToDept = async (deptName) => {
    await fetch('/api/complaints', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department: deptName }),
    });
    alert(`Assigned pending complaints to ${deptName}`);
  };

  return (
    <div>
      <h2>Department Panel</h2>
      <div className="card">
        <div className="grid-2">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Department name" />
          <input value={head} onChange={e => setHead(e.target.value)} placeholder="Department head" />
        </div>
        <button className="btn btn-primary" onClick={addDepartment}>Add Department</button>
      </div>
      <div className="grid-3">
        {departments.map(d => (
          <div key={d._id} className="dept-card">
            <h4>{d.name}</h4>
            <p>Head: {d.head || 'Not assigned'}</p>
            <p>{d.members?.length || 0} members</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button className="btn btn-secondary" onClick={() => assignToDept(d.name)}>Assign Complaints</button>
              <button className="btn btn-danger" onClick={() => deleteDepartment(d._id)}>Delete</button>
            </div>
          </div>
        ))}
        {departments.length === 0 && <div className="empty-state"><h3>No departments yet</h3></div>}
      </div>
    </div>
  );
}

export default DepartmentPanel;
