const pokemonDB = require('../database/pokemonDB')
const {isValidPokemon} = require('../interface/pokemonInterface')
/**
 * @swagger
 * /pokemons:
 *   get:
 *     tags:
 *       - Pokémons
 *     summary: Lista todos os pokémons
 *     responses:
 *       200:
 *         description: Lista de pokémons retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
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


/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     tags:
 *       - Pokémons
 *     summary: Retorna um pokémon pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pokémon a ser buscado
 *     responses:
 *       200:
 *         description: Pokémon encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Pokémon não encontrado
 */
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

/**
 * @swagger
 * /pokemons/{id}:
 *   delete:
 *     tags:
 *       - Pokémons
 *     summary: Deleta um pokémon pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pokémon a ser deletado
 *     responses:
 *       204:
 *         description: Pokémon deletado com sucesso
 *       404:
 *         description: Pokémon não encontrado para deletar
 */
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

/**
 * @swagger
 * /pokemons/{id}:
 *   put:
 *     tags:
 *       - Pokémons
 *     summary: Atualiza o treinador de um pokémon pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pokémon a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               treinador:
 *                 type: string
 *                 description: Novo treinador do pokémon
 *     responses:
 *       204:
 *         description: Pokémon atualizado com sucesso
 *       404:
 *         description: Pokémon não encontrado para atualizar
 */
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

/**
 * @swagger
 * /pokemons:
 *   post:
 *     tags:
 *       - Pokémons
 *     summary: Cria um novo pokémon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 description: Tipo do pokémon
 *               treinador:
 *                 type: string
 *                 description: Nome do treinador
 *             required:
 *               - tipo
 *               - treinador
 *     responses:
 *       201:
 *         description: Pokémon criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Dados inválidos para criação do pokémon
 *       404:
 *         description: Erro ao inserir o pokémon
 */
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