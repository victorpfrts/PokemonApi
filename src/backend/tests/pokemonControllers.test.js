const controller = require('../controllers/pokemonControllers')
const pokemonDB = require('../database/pokemonDB')
const { isValidPokemon } = require('../interface/pokemonInterface')

jest.mock('../database/pokemonDB')
jest.mock('../interface/pokemonInterface')

describe('Pokemon Controller', () => {
  let req, res

  beforeEach(() => {
    req = {
      params: {},
      body: {}
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  describe('getPokemons', () => {
    it('retorna todos os pokémons', async () => {
      pokemonDB.selectPokemons.mockResolvedValue([{ id: 1 }])

      await controller.getPokemons(req, res)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith([{ id: 1 }])
    })

    it('retorna erro 500 em falha', async () => {
      pokemonDB.selectPokemons.mockRejectedValue(new Error('Error on database connection'))

      await controller.getPokemons(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Error on database connection' })
    })
  })

  describe('getPokemon', () => {
    it('retorna um pokémon existente', async () => {
      req.params.id = '1'
      pokemonDB.selectPokemon.mockResolvedValue({ id: 1 })

      await controller.getPokemon(req, res)

      expect(res.json).toHaveBeenCalledWith({ id: 1 })
    })

    it('retorna 404 se pokémon não existir', async () => {
      req.params.id = '1'
      pokemonDB.selectPokemon.mockResolvedValue(null)

      await controller.getPokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Pokemon not found' })
    })

    it('retorna erro 500 em falha', async () => {
      req.params.id = '1'
      pokemonDB.selectPokemon.mockRejectedValue(new Error('Error on database connection'))

      await controller.getPokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Error on database connection' })
    })
  })

  describe('deletePokemon', () => {
    it('deleta com sucesso', async () => {
      req.params.id = '1'
      pokemonDB.deletePokemon.mockResolvedValue(true)

      await controller.deletePokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(204)
      expect(res.json).toHaveBeenCalledWith({ message: 'Success on delete' })
    })

    it('retorna 404 se pokémon não existir', async () => {
      req.params.id = '1'
      pokemonDB.deletePokemon.mockResolvedValue(false)

      await controller.deletePokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Error on delete: Pokemon not found' })
    })

    it('retorna erro 500 em falha', async () => {
      req.params.id = '1'
      pokemonDB.deletePokemon.mockRejectedValue(new Error('Error on database connection'))

      await controller.deletePokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Error on database connection' })
    })
  })

  describe('putPokemon', () => {
    it('atualiza com sucesso', async () => {
      req.params.id = '1'
      req.body.treinador = 'Ash'
      pokemonDB.updatePokemon.mockResolvedValue(true)

      await controller.putPokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(204)
      expect(res.json).toHaveBeenCalledWith({ message: 'Success on update' })
    })

    it('retorna 404 se não encontrar pokémon', async () => {
      req.params.id = '1'
      req.body.treinador = 'Ash'
      pokemonDB.updatePokemon.mockResolvedValue(false)

      await controller.putPokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Error on update: Pokemon not found' })
    })

    it('retorna erro 500 em falha', async () => {
      req.params.id = '1'
      req.body.treinador = 'Ash'
      pokemonDB.updatePokemon.mockRejectedValue(new Error('Error on database connection'))

      await controller.putPokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Error on database connection' })
    })
  })

  describe('postPokemon', () => {
    it('cria com sucesso', async () => {
      req.body = { tipo: 'charizard', treinador: 'Ash' }
      isValidPokemon.mockReturnValue(true)
      pokemonDB.insertPokemon.mockResolvedValue({ id: 10 })

      await controller.postPokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({ id: 10 })
    })

    it('retorna 400 se tipo for inválido', async () => {
      req.body = { tipo: 'Invalido', treinador: 'Ash' }
      isValidPokemon.mockReturnValue(false)

      await controller.postPokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid pokemon' })
    })

    it('retorna 404 se insert falhar', async () => {
      req.body = { tipo: 'charizard', treinador: 'Ash' }
      isValidPokemon.mockReturnValue(true)
      pokemonDB.insertPokemon.mockResolvedValue(null)

      await controller.postPokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({ message: 'Error on insert' })
    })

    it('retorna erro 500 em falha', async () => {
      req.body = { tipo: 'charizard', treinador: 'Ash' }
      isValidPokemon.mockReturnValue(true)
      pokemonDB.insertPokemon.mockRejectedValue(new Error('Error on database connection'))

      await controller.postPokemon(req, res)

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Error on database connection' })
    })
  })
})
