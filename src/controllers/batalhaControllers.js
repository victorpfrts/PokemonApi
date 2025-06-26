const pokemonDB = require('../database/pokemonDB')

const batalha = async (pokemonA, pokemonB) => {
  try{ 
    const random = Math.floor(Math.random() * 101)
    const winnerProb = (Number(pokemonA.nivel)/(Number(pokemonA.nivel)+Number(pokemonB.nivel))) * 100
    let vencedor = null
    let perdedor = null
    console.log('random', random)
    console.log('winnerProb', winnerProb)
    if(winnerProb > random){
      pokemonA.nivel += 1
      pokemonB.nivel -= 1
      vencedor = pokemonA
      perdedor = pokemonB
    } else {
      pokemonA.nivel -= 1
      pokemonB.nivel += 1
      vencedor = pokemonB
      perdedor = pokemonA
    }
    await pokemonDB.updateNivelPokemon(vencedor.id, vencedor.nivel)
    await pokemonDB.updateNivelPokemon(perdedor.id, perdedor.nivel)
    return {vencedor, perdedor}
  } catch(e) {
    throw new Error(e)
  }
  
}

exports.postBatalha = async (req, res) => {
  try{
    const { pokemonAId, pokemonBId } = req.params
    const pokemonA = await pokemonDB.selectPokemon(pokemonAId)
    const pokemonB = await pokemonDB.selectPokemon(pokemonBId)
    if(!pokemonA || !pokemonB) res.status(404).json({
      message: `Pokemon '${pokemonA?pokemonBId:pokemonAId}' not found`
    })
    const response = await batalha(pokemonA, pokemonB)

    res.json(response)
  } catch(e) {
    res.status(500).json({
      message: e.message
    })
  } 
  
}