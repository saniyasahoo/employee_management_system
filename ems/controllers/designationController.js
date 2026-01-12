const Designation = require('../models/designation');
const path = require('path');
const fs = require('fs');

// CREATE
exports.createDesignation = async (req, res) => {
  try {
    const { name, departmentId } = req.body;
    let filename = null;

    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadDir = path.join(__dirname, '..', 'uploads', 'designation');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      filename = Date.now() + '-' + imageFile.name;
      const filepath = path.join(uploadDir, filename);
      await imageFile.mv(filepath); // save to uploads/designation
    }

    const designation = await Designation.create({
      name,
      departmentId,
      image: filename ? `designation/${filename}` : null
    });

    res.status(201).json(designation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ
exports.getDesignations = async (req, res) => {
  try {
    const designations = await Designation.findAll();
    res.json(designations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, departmentId } = req.body;
    let filename = null;

    const designation = await Designation.findByPk(id);
    if (!designation) return res.status(404).json({ error: 'Designation not found' });

    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadDir = path.join(__dirname, '..', 'uploads', 'designation');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      filename = Date.now() + '-' + imageFile.name;
      const filepath = path.join(uploadDir, filename);
      await imageFile.mv(filepath);

      designation.image = `designation/${filename}`;
    }

    designation.name = name || designation.name;
    designation.departmentId = departmentId || designation.departmentId;

    await designation.save();
    res.json(designation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Designation.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: 'Designation not found' });

    res.json({ message: 'Designation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
