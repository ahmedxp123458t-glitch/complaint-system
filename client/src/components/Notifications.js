import React, { useState, useEffect } from 'react';

function Notifications() {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    fetch('/api/notifications?userId=user1')
      .then(res => res.json())
      .then(data => setNotifs(data))
      .catch(() => {});
  }, []);

  const markRead = async (id) => {
    const res = await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
    const updated = await res.json();
    setNotifs(notifs.map(n => (n._id === id ? updated : n)));
  };

  const deleteNotif = async (id) => {
    await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
    setNotifs(notifs.filter(n => n._id !== id));
  };

  return (
    <div>
      <h2>Notifications ({notifs.filter(n => !n.read).length} unread)</h2>
      {notifs.map(n => (
        <div key={n._id} className={`card complaint-card ${!n.read ? 'pending' : 'resolved'}`} onClick={() => !n.read && markRead(n._id)}>
          <p>{n.message}</p>
          <div className="meta">
            {new Date(n.createdAt).toLocaleString()}
            {!n.read && <span className="status-badge status-pending" style={{ marginLeft: 8 }}>New</span>}
          </div>
          <button className="btn btn-danger" style={{ marginTop: 8 }} onClick={(e) => { e.stopPropagation(); deleteNotif(n._id); }}>Delete</button>
        </div>
      ))}
      {notifs.length === 0 && <div className="empty-state"><h3>No notifications</h3></div>}
    </div>
  );
}

export default Notifications;
