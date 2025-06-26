const postBatalha = require('../controllers/batalhaControllers')
const pokemonDB = require('../database/pokemonDB')

jest.mock('../database/pokemonDB')

describe('postBatalha', () => {
  let req, res

  beforeEach(() => {
    req = {
      params: {
        pokemonAId: '1',
        pokemonBId: '2'
      }
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
  })

  it('deve retornar o resultado da batalha quando ambos os pokémons existem', async () => {
    const pokemonA = { id: '1', nivel: 5 }
    const pokemonB = { id: '2', nivel: 3 }

    pokemonDB.selectPokemon
      .mockResolvedValueOnce({ ...pokemonA })
      .mockResolvedValueOnce({ ...pokemonB })

    pokemonDB.updateNivelPokemon.mockResolvedValue()

    jest.spyOn(Math, 'random').mockReturnValue(0.1)

    await postBatalha.postBatalha(req, res)

    expect(res.json).toHaveBeenCalledWith({
      vencedor: expect.objectContaining({ id: '1', nivel: 6 }),
      perdedor: expect.objectContaining({ id: '2', nivel: 2 })
    })

    Math.random.mockRestore()
  })

  it('deve retornar 404 se um dos pokémons não for encontrado', async () => {
    pokemonDB.selectPokemon
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: '2', nivel: 3 })

    await postBatalha.postBatalha(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: "Pokemon '1' not found"
    })
  })

  it('deve retornar erro 500 se lançar exceção', async () => {
    pokemonDB.selectPokemon.mockRejectedValue(new Error('DB Error'))

    await postBatalha.postBatalha(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'DB Error'
    })
  })
})