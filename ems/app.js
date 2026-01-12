const express = require('express');
const fileUpload = require('express-fileupload');
const sequelize = require('./config/db');

const departmentRoutes = require('./routes/departmentRoutes');
const designationRoutes = require('./routes/designationRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const experienceRoutes = require('./routes/experienceRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload()); 
app.use('/uploads', express.static('uploads')); 
// Routes
app.use('/departments', departmentRoutes);
app.use('/api/designations', designationRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/experiences', experienceRoutes);

// DB Sync and Start Server
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("EMS server running on http://localhost:3000");
  });
});
