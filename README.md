# Complaint System

A full-stack MERN application for managing complaints with submission, status tracking, department assignment, notifications, and analytics.

## Features

- **Complaint Submission** – Submit complaints with title, description, department, and priority
- **Status Tracking** – Visual timeline showing complaint lifecycle (pending → in-progress → resolved/rejected)
- **Department Assignment** – Manage departments and assign complaints to them
- **Notifications** – Receive and manage notifications for complaint updates
- **Analytics Dashboard** – Charts for complaints by department and status, plus average resolution time

## Architecture

```
complaint-system/
├── server/
│   ├── config/db.js
│   ├── models/
│   │   ├── Complaint.js
│   │   ├── Department.js
│   │   └── Notification.js
│   ├── routes/
│   │   ├── complaints.js
│   │   ├── departments.js
│   │   └── notifications.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── client/
│   ├── public/index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── components/
│   │       ├── Navbar.js
│   │       ├── ComplaintForm.js
│   │       ├── ComplaintList.js
│   │       ├── StatusTracker.js
│   │       ├── DepartmentPanel.js
│   │       ├── Analytics.js
│   │       └── Notifications.js
│   └── package.json
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/complaints | List complaints |
| POST   | /api/complaints | Create complaint |
| PUT    | /api/complaints/:id | Update complaint |
| DELETE | /api/complaints/:id | Delete complaint |
| GET    | /api/departments | List departments |
| POST   | /api/departments | Create department |
| DELETE | /api/departments/:id | Delete department |
| GET    | /api/notifications | List notifications |
| POST   | /api/notifications | Create notification |
| PUT    | /api/notifications/:id/read | Mark as read |

## Usage

1. Start MongoDB on port 27017
2. `cd server && npm install && npm run seed && npm start`
3. `cd client && npm install && npm start`
4. Open `http://localhost:3000`
