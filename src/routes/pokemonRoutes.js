const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonControllers')

router.get('/', pokemonController.getPokemons);
router.get('/:id', pokemonController.getPokemon);
router.delete('/:id', pokemonController.deletePokemon)
router.put('/:id', pokemonController.putPokemon)
router.post('/', pokemonController.postPokemon)

module.exports = router;
