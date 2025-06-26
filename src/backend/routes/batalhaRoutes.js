const express = require('express');
const router = express.Router();
const batalhaController = require('../controllers/batalhaControllers')

router.post('/:pokemonAId/:pokemonBId', batalhaController.postBatalha);
module.exports = router;
