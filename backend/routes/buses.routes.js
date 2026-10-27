const express = require('express');
const router = express.Router();
const busController = require('../controllers/buses.controller');
router.get('/', busController.getAll);
router.get('/:id', busController.getById);
router.post('/', busController.create);
router.put('/:id', busController.update);
router.delete('/:id', busController.delete);
module.exports = router;
