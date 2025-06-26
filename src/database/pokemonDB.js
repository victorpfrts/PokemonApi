const { queryDB } = require('../database/db')

exports.selectPokemons = async () => {
  const response = await queryDB('SELECT id, treinador, tipo, nivel FROM pokemon WHERE situacao=true AND nivel >0 ORDER BY id')
  return response.rows
}

exports.selectPokemon = async (id) => {
  const response = await queryDB('SELECT id, treinador, tipo, nivel FROM pokemon WHERE id=:id AND situacao=true AND nivel >0', {id})
  return response.rows[0]
}

exports.deletePokemon = async (id) => {
  const response = await queryDB('UPDATE pokemon SET situacao=:situacao WHERE id=:id AND situacao=true RETURNING *', {
    id:id, 
    situacao:false
  })
  return response.rows[0]
}

exports.updatePokemon = async (id, treinador) => {
  const response = await queryDB('UPDATE pokemon SET treinador=:treinador WHERE id=:id AND situacao=true AND nivel >0 RETURNING *', {id, treinador})
  return response.rows[0]
}

exports.insertPokemon = async ({tipo, treinador}) => {
  const response = await queryDB('INSERT INTO pokemon (tipo, treinador) VALUES (:tipo, :treinador) RETURNING id, treinador, tipo, nivel', {tipo, treinador})
  return response.rows[0]
}

exports.updateNivelPokemon = async (id, nivel) => {
  await queryDB('UPDATE pokemon SET nivel=:nivel WHERE id=:id AND situacao=true AND nivel >0 RETURNING *', {id, nivel})
}
