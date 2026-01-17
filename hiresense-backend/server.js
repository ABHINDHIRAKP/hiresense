const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require('./config/dbConnection');

app.use(express.json());

connectDB();

app.use("/api/users", require('./routes/userRoutes'));
app.use("/api/jobs", require('./routes/jobRoutes'));
app.use("/api/resume", require('./routes/resumeRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});