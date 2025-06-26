const TipoPokemon = {
  charizard: 'charizard',
  mewtwo: 'mewtwo',
  pikachu: 'pikachu',
}

exports.isValidPokemon = (pokemon) => {
  return Object.values(TipoPokemon).includes(pokemon)
}
