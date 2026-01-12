const Employee = require('../models/employee');
const path = require('path');
const fs = require('fs');

// CREATE
exports.createEmployee = async (req, res) => {
  try {
    const {
      name, age, salary, qualification,
      departmentId, designationId
    } = req.body;

    let filename = null;

    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadDir = path.join(__dirname, '..', 'uploads', 'employees');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      filename = Date.now() + '-' + imageFile.name;
      const filepath = path.join(uploadDir, filename);
      await imageFile.mv(filepath);
    }

    const employee = await Employee.create({
      name,
      age,
      salary,
      qualification,
      departmentId,
      designationId,
      image: filename ? `employees/${filename}` : null
    });

    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, age, salary, qualification,
      departmentId, designationId
    } = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    let filename = null;

    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadDir = path.join(__dirname, '..', 'uploads', 'employees');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      filename = Date.now() + '-' + imageFile.name;
      const filepath = path.join(uploadDir, filename);
      await imageFile.mv(filepath);

      employee.image = `employees/${filename}`;
    }

    // Update other fields
    employee.name = name || employee.name;
    employee.age = age || employee.age;
    employee.salary = salary || employee.salary;
    employee.qualification = qualification || employee.qualification;
    employee.departmentId = departmentId || employee.departmentId;
    employee.designationId = designationId || employee.designationId;

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
