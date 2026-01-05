const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require('./config/dbConnection');

app.use(express.json());
connectDB();
app.use("/api/users", require('./routes/userRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});