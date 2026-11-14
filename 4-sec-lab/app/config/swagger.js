const swaggerUi    = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title      : 'Docker Lab API',
      version    : '1.0.0',
      description: 'A simple Express API interacting with MongoDB',
    },
    servers: [
      {
        url: `http://localhost:${process.env.APP_PORT_INTERNAL || 3000}`,
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
