<h1>PokemonApi</h1>

<h2>Descrição</h2>
<span>Desenvolver uma api que realize a gestão de cadastro de pokemons e realizar batalhas entre eles.</span>

<h2>Tecnologias</h2>
<li>NodeJS</li>
<li>PostegreSQL</li>
<li>Docker</li>
<li>Jest</li>
<li>React</li>

### Pré-Requisitos

Certifique-se de ter as seguintes dependências instaladas na sua máquina.
<li><a href="https://nodejs.org/en/downloadl">NodeJS</a></li>
<li><a href="https://www.docker.com/products/docker-desktop">Docker</a></li>

Clone este repositório:
```
$ git clone https://github.com/victorpfrts/PokemonApi
```

Execute a aplicação em modo de desenvolvimento local (certifique-se que o docker está ativo na sua máquina)
```
$ make local
```

### O servidor inciará na porta:3000 
#### Utilize o endpoit <http://localhost:3000/> 

### A aplicação inciará na porta:5173 
#### Utilize o endpoit <http://localhost:5173/>

<h2>📄 Endpoints da API</h2>

<h3>🔹 POST /pokemons</h3>
<p>Cria os dados no pokemon.</p>
<p><strong>Payload:</strong></p>
<pre><code>{
  "tipo": "mewtwo",
  "treinador": "Ash"
}
</code></pre>
<p><strong>Resposta:</strong></p>
<h4>Status: 201 - Created</h4>
<pre><code>{
  "id": 1,
  "treinador": "Ash",
  "tipo": "mewtwo",
  "nivel": 1
}
</code></pre>

<h3>🔹 PUT /pokemons/:id</h3>
<p>Atualiza o treinador.</p>
<p><strong>Payload:</strong></p>
<pre><code>{
  "treinador": "Ash Ketchum"
}
</code></pre>
<p><strong>Resposta:</strong></p>
<h4>Status: 204 - No Content</h4>

<h3>🔹 DELETE /pokemons/:id</h3>
<p>Atualiza o treinador.</p>
</code></pre>
<p><strong>Resposta:</strong></p>
<h4>Status: 204 - No Content</h4>

<h3>🔹 GET /pokemons</h3>
<p>Lista todos os pokemons cadastrados.</p>
<p><strong>Resposta:</strong></p>
<h4>Status: 200 - Ok</h4>
<pre><code>[
  {
    "id": 1,
    "treinador": "Ash",
    "tipo": "mewtwo",
    "nivel": 7
  },
  {
    "id": 2,
    "treinador": "Dawn",
    "tipo": "Pikachu",
    "nivel": 1
  }
]
</code></pre>

<h3>🔹 GET /pokemons/:id</h3>
<p>Retorna os dados de um pokemon.</p>
<p><strong>Resposta: </strong></p>
<h4>Status: 200 - Ok</h4>
<pre><code>{
  "id": 1,
  "treinador": "Ash",
  "tipo": "mewtwo",
  "nivel": 1
}
</code></pre>

<h3>🔹 POST /batalhar/:pokemonAId/:pokemonBId</h3>
<p>Realiza a batalha entre os pokemons.</p>
<p><strong>Payload:</strong></p>
<pre><code>{
  "tipo": "mewtwo",
  "treinador": "Ash"
}
</code></pre>
<p><strong>Resposta:</strong></p>
<h4>Status: 200 - Ok</h4>
<pre><code>{
  "vencedor": {
    "id": 1,
    "tipo": "pikachu",
    "treinador": "Ash",
    "nivel": 2 
  },
  "perdedor": {
    "id": 2,
    "tipo": "charizard",
    "treinador": "Dawn",
    "nivel": 0 
  }
}
</code></pre>

<h2>📝 Observações</h2>
  <ul>
    <li>O algoritmo utilizado na batalha funciona de forma aleatória, porém levando em consideração o nivel do pokemon, ou seja, pokemons com maior nivel tem maior chance de ganhar.</li>
    <li>O projeto usa PostgreSQL via Docker, utilizei a criação e subida de um banco local via docker-compose para facilitar nos testes locais.</li>
  </ul>