const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Pokémon',
      version: '1.0.0',
      description: 'Documentação da API de batalha de pokémons'
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/controllers/*.js'], 
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec