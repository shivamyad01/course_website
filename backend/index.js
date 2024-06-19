const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
const app = express();
const db = require('./models');

// Middleware
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors());

// Or specify specific origins
// app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Database synchronization
const PORT = process.env.PORT || 5001;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
