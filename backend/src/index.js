const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Cora API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const challengeTemplateRoutes = require('./routes/challengeTemplates');
const challengeInstanceRoutes = require('./routes/challengeInstances');

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/challenge-templates', challengeTemplateRoutes);
app.use('/challenge-instances', challengeInstanceRoutes);

module.exports = app;

