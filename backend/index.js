const connectToMongo = require("./config/db");
const express = require("express");
const app = express();

app.use(express.json());
const startServer = async () => {
  await connectToMongo();
  
  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/notes', require('./routes/notes'));
  
  
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
};

startServer();