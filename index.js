require('dotenv').config();
const app = require('./app');
const { AppDataSource } = require('./config/db');

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection error:', err.message);
    process.exit(1); // Exit the process if the database connection fails
  });

module.exports = { AppDataSource };