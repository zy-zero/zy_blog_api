const path = require('path');
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const bodyParserJsonError = require('express-body-parser-json-error');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const {errorHandler} = require('./common/errorHandler');
const requestIp = require('request-ip');

app.use(requestIp.mw());

app.use(bodyParser.json({limit:"10mb"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParserJsonError());

app.use(cors({
  origin: true,
  methods: ['GET','POST', 'PUT', 'DELETE'],
  allowedHeaders:['Content-Type','Authorization', 'uuid','email', 'Pragma']
}));

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const rootPath = path.normalize(path.join(__dirname, './public'));
app.use(express.static(rootPath));

// swagger configurations
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
// config swagger-jsdoc
const swaggerOptions = {
  definition: {
    // open api version
    openapi: '3.0.0',
    // swagger pages
    info: {
      title: 'User blog',
      version: '1.0.0',
    },
    components:{
      securitySchemes:{
        ApiKeyAuth:{
          type: 'apiKey',
          in: 'header',
          name: 'Authorization'
        },
      }
    }
  },
  // path to collect swagger comment
  apis: [ path.join(__dirname, '/app/**/*.controller.js')]
};
// generate jsDoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// open swagger api
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// use swaggerSpec generate swagger document pages，and put it to specified router
app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
const routes = require('./app/router');
app.use('/api/v1',routes);

// handle error
app.use(errorHandler);

// show api routers in console
let urls = [];
const paresHandler = require('./common/utils/parseHandler');
paresHandler('',urls,app._router);
urls.forEach(u=>{
  console.info(u);
});

// add socket io server feature
const server = require('http').Server(app);

server.listen(config.httpPort, '0.0.0.0', () => {
  console.log(`listening on http port: ${config.httpPort}`)
});

module.exports = {
  app:app,
  httpServer:server
};



// process.on('SIGINT', () => {
//   console.log('Received SIGINT')
//   // if (server) {
//   //   server.close(() => {
//   //     console.log('server close, exiting')
//   //     process.exit(0)
//   //   })
//   // }
// })
