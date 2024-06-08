require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./server/config/db');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/v1', require('./server/routes/main'));
app.use('/api/v1', require('./server/routes/auth'));

require('./server/cron'); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
