const express = require('express');
const app = express();
const pokemonRoutes = require('./routes/pokemonRoutes');
const batalhaRoutes = require('./routes/batalhaRoutes')
require('dotenv').config();

app.use(express.json());
app.use('/pokemons', pokemonRoutes);
app.use('/batalhar', batalhaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
