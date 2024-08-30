const express = require('express');
const router = express.Router();
const possessionController = require('../controllers/possessionController');

// Routes liées aux possessions
router.get('/', possessionController.getPossessions);
router.post('/', possessionController.createPossession);
router.put('/:libelle', possessionController.updatePossession);
router.patch('/close/:libelle', possessionController.closePossession);

module.exports = router;
