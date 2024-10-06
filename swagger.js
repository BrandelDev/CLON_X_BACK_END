const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Clon de Twitter',
    description: 'Documentación de la API para el clon de Twitter',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/apiRoutes.js']; // Ruta de tu archivo de rutas

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index.js'); // Tu archivo principal que inicia el servidor
});