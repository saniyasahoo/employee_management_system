const Department = require('../models/department');
const path = require('path');
const fs = require('fs');

// CREATE
exports.createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body;
    let filename = null;

    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadDir = path.join(__dirname, '..', 'uploads', 'department');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      filename = Date.now() + '-' + imageFile.name;
      const filepath = path.join(uploadDir, filename);
      await imageFile.mv(filepath);
    }

    const department = await Department.create({
      name,
      description,
      image: filename ? `department/${filename}` : null
    });

    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    let filename = null;

    const department = await Department.findByPk(id);
    if (!department) return res.status(404).json({ error: 'Department not found' });

    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadDir = path.join(__dirname, '..', 'uploads', 'department');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      filename = Date.now() + '-' + imageFile.name;
      const filepath = path.join(uploadDir, filename);
      await imageFile.mv(filepath);

      department.image = `department/${filename}`;
    }

    department.name = name || department.name;
    department.description = description || department.description;
    await department.save();

    res.json(department);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Department.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: 'Department not found' });
    res.json({ message: 'Department deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
