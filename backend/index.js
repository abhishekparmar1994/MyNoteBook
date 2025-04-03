require('dotenv').config(); // Load environment variables
const connectToMongo = require("./config/db");
const express = require("express");
const app = express();
var cors = require('cors')

app.use(express.json());
app.use(cors())
const startServer = async () => {
  await connectToMongo();
  
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/notes', require('./routes/notes'));
  
  const PORT = process.env.PORT || 3000; // Use port from environment variable
  
  app.listen(PORT, () => {
    console.log(`---------------------------------------------`);
    console.log(`Server is starting...`);
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`---------------------------------------------`);
  });
};

startServer();