const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');

const router = express.Router();
//V1 Docs for SwaggerUi
const specsWeb = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js'],
});

//V2 Docs for Swagger Ui
const specsMobile = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v2/*.js'],
});


router.use('/web', swaggerUi.serveFiles(specsWeb, {}), swaggerUi.setup(specsWeb));
router.use('/mobile', swaggerUi.serveFiles(specsMobile,  {}), swaggerUi.setup(specsMobile));


module.exports = router;
