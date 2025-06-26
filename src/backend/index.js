const express = require('express');
const app = express();
const pokemonRoutes = require('./routes/pokemonRoutes');
const batalhaRoutes = require('./routes/batalhaRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../../docs/swagger');
const cors = require('cors')

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/pokemons', pokemonRoutes);
app.use('/batalhar', batalhaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
