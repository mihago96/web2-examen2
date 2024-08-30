const express = require('express');
const router = express.Router();
const patrimoineController = require('../controllers/patrimoineController');

// Routes liées au patrimoine
router.get('/valeur', patrimoineController.getValeurPatrimoine);
router.get('/valeur-periode', patrimoineController.getValeurPatrimoinePeriode);
router.get('/sort', patrimoineController.sortPossessions);

module.exports = router;
