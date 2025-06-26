import React, { useEffect, useState } from 'react'

export default function App() {
  const [pokemons, setPokemons] = useState([])
  const [pokemonA, setPokemonA] = useState(null)
  const [pokemonB, setPokemonB] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    carregarPokemons()
  }, [])

  const carregarPokemons = () => {
    fetch('http://localhost:3000/pokemons')
      .then(res => res.json())
      .then(data => {
        const ordenados = data.sort((a, b) => {
          // Ordena primeiro por treinador, depois por tipo
          const nomeTreinadorA = (a.treinador || '').toLowerCase()
          const nomeTreinadorB = (b.treinador || '').toLowerCase()
          if (nomeTreinadorA < nomeTreinadorB) return -1
          if (nomeTreinadorA > nomeTreinadorB) return 1
  
          const tipoA = (a.tipo || '').toLowerCase()
          const tipoB = (b.tipo || '').toLowerCase()
          return tipoA.localeCompare(tipoB)
        })
        setPokemons(ordenados)
      })
      .catch(err => setError('Erro ao carregar pokémons'))
  }

  const handleBatalha = async () => {
    if (!pokemonA || !pokemonB) {
      alert('Selecione dois pokémons para batalhar')
      return
    }
    setLoading(true)
    setResultado(null)
    setError(null)

    try {
      const res = await fetch(`http://localhost:3000/batalhar/${pokemonA.id}/${pokemonB.id}`, {
        method: 'POST',
      })
      if (!res.ok) throw new Error('Erro na batalha')
      const data = await res.json()
      setResultado(data)
      carregarPokemons()
    } catch {
      setError('Falha ao executar batalha')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      <h1>Batalha Pokémon</h1>
    
      <div style={{ marginBottom: '1rem', width: '300px' }}>
        <label>Pokémon A:</label>
        <select
          value={pokemonA?.id || ''}
          onChange={e => {
            const selected = pokemons.find(p => p.id === Number(e.target.value))
            setPokemonA(selected)
          }}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        >
          <option value="">Selecionar Pokémon A</option>
          {pokemons
            .filter(p => !pokemonB || p.id !== pokemonB.id)
            .map(p => (
              <option key={p.id} value={p.id}>
                {p.treinador} - {p.tipo} (Nível {p.nivel})
              </option>
            ))}
        </select>
      </div>
    
      <div style={{ marginBottom: '1rem', width: '300px' }}>
        <label>Pokémon B:</label>
        <select
          value={pokemonB?.id || ''}
          onChange={e => {
            const selected = pokemons.find(p => p.id === Number(e.target.value))
            setPokemonB(selected)
          }}
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        >
          <option value="">Selecionar Pokémon B</option>
          {pokemons
            .filter(p => !pokemonA || p.id !== pokemonA.id)
            .map(p => (
              <option key={p.id} value={p.id}>
                {p.treinador} - {p.tipo} (Nível {p.nivel})
              </option>
            ))}
        </select>
      </div>
    
      <button
        onClick={handleBatalha}
        style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}
        disabled={loading}
      >
        {loading ? 'Lutando...' : 'Iniciar Batalha'}
      </button>
    
      {resultado && (
        <div style={{ textAlign: 'center' }}>
          <p><strong>🏆 Vencedor:</strong> {resultado.vencedor.treinador} - {resultado.vencedor.tipo}</p>
          <p><strong>❌ Perdedor:</strong> {resultado.perdedor.treinador} - {resultado.perdedor.tipo}</p>
        </div>
      )}
    
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    
  )
}
