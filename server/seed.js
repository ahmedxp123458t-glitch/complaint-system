const { connectDB } = require('./config/db');
const Complaint = require('./models/Complaint');
const Department = require('./models/Department');
const Notification = require('./models/Notification');

const seed = async () => {
  await connectDB();

  await Complaint.deleteMany({});
  await Department.deleteMany({});
  await Notification.deleteMany({});

  await Department.create({ name: 'IT Support', head: 'Alice', members: ['Alice', 'Bob'] });
  await Department.create({ name: 'HR', head: 'Charlie', members: ['Charlie', 'Diana'] });
  await Department.create({ name: 'Facilities', head: 'Eve', members: ['Eve'] });

  await Complaint.create({ userId: 'user1', title: 'Computer not working', description: 'Blue screen on startup', department: 'IT Support', status: 'pending', priority: 'high' });
  await Complaint.create({ userId: 'user2', title: 'Salary discrepancy', description: 'Missing payment for June', department: 'HR', status: 'in-progress', priority: 'high' });
  await Complaint.create({ userId: 'user3', title: 'AC broken', description: 'No cooling in office', department: 'Facilities', status: 'resolved', priority: 'medium', resolvedAt: new Date() });

  await Notification.create({ userId: 'user1', message: 'Your complaint has been received', read: false });

  console.log('Seed complete');
  process.exit(0);
};

seed();
