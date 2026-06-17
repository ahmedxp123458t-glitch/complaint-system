import React, { useState, useEffect } from 'react';

function Analytics() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch('/api/complaints')
      .then(res => res.json())
      .then(data => setComplaints(data))
      .catch(() => {});
  }, []);

  const deptCounts = {};
  const statusCounts = {};
  let resolvedTimeSum = 0;
  let resolvedCount = 0;

  complaints.forEach(c => {
    const dept = c.department || 'Unassigned';
    deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
    if (c.status === 'resolved' && c.resolvedAt) {
      const created = new Date(c.createdAt).getTime();
      const resolved = new Date(c.resolvedAt).getTime();
      resolvedTimeSum += (resolved - created) / (1000 * 60 * 60 * 24);
      resolvedCount++;
    }
  });

  const avgResolutionTime = resolvedCount ? (resolvedTimeSum / resolvedCount).toFixed(1) : 'N/A';
  const maxCount = Math.max(...Object.values(deptCounts), 1);
  const deptColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <div className="grid-4">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#e74c3c' }}>{complaints.length}</h3>
          <p>Total Complaints</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#f39c12' }}>{statusCounts['pending'] || 0}</h3>
          <p>Pending</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#3498db' }}>{statusCounts['in-progress'] || 0}</h3>
          <p>In Progress</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#2ecc71' }}>{avgResolutionTime}d</h3>
          <p>Avg Resolution</p>
        </div>
      </div>
      <div className="analytics-grid">
        <div className="chart-container">
          <h4>Complaints by Department</h4>
          {Object.entries(deptCounts).map(([dept, count], i) => (
            <div key={dept} className="chart-bar">
              <div className="label">{dept}</div>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${(count / maxCount) * 100}%`, background: deptColors[i % deptColors.length] }}>
                  {count}
                </div>
              </div>
            </div>
          ))}
          {Object.keys(deptCounts).length === 0 && <p style={{ color: '#888' }}>No data</p>}
        </div>
        <div className="chart-container">
          <h4>Complaints by Status</h4>
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="chart-bar">
              <div className="label">{status}</div>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${(count / Math.max(...Object.values(statusCounts), 1)) * 100}%`, background: status === 'pending' ? '#f39c12' : status === 'in-progress' ? '#3498db' : status === 'resolved' ? '#2ecc71' : '#e74c3c' }}>
                  {count}
                </div>
              </div>
            </div>
          ))}
          {Object.keys(statusCounts).length === 0 && <p style={{ color: '#888' }}>No data</p>}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
