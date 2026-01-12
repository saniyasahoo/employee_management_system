const express = require('express');
const router = express.Router();
const controller = require('../controllers/designationController'); 

router.post('/', controller.createDesignation);      
router.get('/', controller.getDesignations);
router.put('/:id', controller.updateDesignation);
router.delete('/:id', controller.deleteDesignation);

module.exports = router;
