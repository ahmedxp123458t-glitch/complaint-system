const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/notifications', require('./routes/notifications'));

app.get('/', (req, res) => {
  res.json({ message: 'Complaint System API' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
