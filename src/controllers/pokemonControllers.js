const pokemonDB = require('../database/pokemonDB')
const {isValidPokemon} = require('../interface/pokemonInterface')

exports.getPokemons = async (req, res) => {
  try{
    const response = await pokemonDB.selectPokemons()
    res.status(200).json(response)
  } catch(e) {
    res.status(500).json({
      message: e.message
    })
  }
}

exports.getPokemon = async (req, res) => {
  try{
    const {id} = req.params
    const response = await pokemonDB.selectPokemon(id)
    if(!response) res.status(404).json({
      message: 'Pokemon not found'
    })
    res.json(response)
  } catch(e) {
    res.status(500).json({
      message: e.message
    })
  } 
}

exports.deletePokemon = async (req, res) => {
  try{
    const {id} = req.params
    const response = await pokemonDB.deletePokemon(id)
    if(!response) res.status(404).json({
      message: 'Error on delete: Pokemon not found'
    })
    res.status(204).json({
      message: `Success on delete`
    })
  } catch(e) {
    res.status(500).json({
      message: e.message
    })
  } 
}

exports.putPokemon = async (req, res) => {
  try{
    const {id} = req.params
    const {treinador} = req.body
    const response = await pokemonDB.updatePokemon(id, treinador)
    if(!response) res.status(404).json({
      message: 'Error on update: Pokemon not found'
    })
    res.status(204).json({
      message: `Success on update`
    })
  } catch(e) {
    res.status(500).json({
      message: e.message
    })
  } 
}

exports.postPokemon = async (req, res) => {
  try{
    const {tipo, treinador} = req.body
    if(!isValidPokemon(tipo)) res.status(400).json({
      message: 'Invalid pokemon'
    })
    const response = await pokemonDB.insertPokemon({tipo, treinador})
    if(!response) res.status(404).json({
      message: 'Error on insert'
    })
    res.status(201).json(response)
  } catch(e) {
    res.status(500).json({
      message: e.message
    })
  } 
}