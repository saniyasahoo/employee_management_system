const Experience = require('../models/experience');
const path = require('path');
const fs = require('fs');

// CREATE
exports.createExperience = async (req, res) => {
  try {
    const { title, employeeId } = req.body;
    let filename = null;

    if (req.files && req.files.certificate) {
      const certFile = req.files.certificate;
      const uploadDir = path.join(__dirname, '..', 'uploads', 'experience');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      filename = Date.now() + '-' + certFile.name;
      const filepath = path.join(uploadDir, filename);
      await certFile.mv(filepath);
    }

    const experience = await Experience.create({
      title,
      employeeId,
      certificate: filename ? `experience/${filename}` : null
    });

    res.status(201).json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET
exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.findAll();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, employeeId } = req.body;

    const experience = await Experience.findByPk(id);
    if (!experience) return res.status(404).json({ error: 'Experience not found' });

    if (req.files && req.files.certificate) {
      const certFile = req.files.certificate;
      const uploadDir = path.join(__dirname, '..', 'uploads', 'experience');

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filename = Date.now() + '-' + certFile.name;
      const filepath = path.join(uploadDir, filename);
      await certFile.mv(filepath);

      experience.certificate = `experience/${filename}`;
    }

    experience.title = title || experience.title;
    experience.employeeId = employeeId || experience.employeeId;

    await experience.save();
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Experience.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: 'Experience not found' });

    res.json({ message: 'Experience deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
