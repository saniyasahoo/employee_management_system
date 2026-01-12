const express = require('express');
const router = express.Router();
const controller = require('../controllers/experienceController');

router.post('/', controller.createExperience);
router.get('/', controller.getExperiences);
router.put('/:id', controller.updateExperience);
router.delete('/:id', controller.deleteExperience);

module.exports = router;
