/**
* @name Game
* @summary Game Hydra service entry point
* @description games
*/
'use strict';

const version = require('./package.json.js').version;
const hydra = require('hydra');
// const jwtAuth = require('fwsp-jwt-auth');
let config = require('fwsp-config');

const HydraLogger = require('fwsp-logger').HydraLogger;
hydra.use(new HydraLogger());

const Game = require('./src/Game');

/**
* Load configuration file
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    config.hydra.serviceVersion = version;
    // return jwtAuth.loadCerts(null, config.jwtPublicCert);
  })
  .then((status) => {
    /**
    * Initialize hydra
    */
    return hydra.init(config);
  })
  .then(() => hydra.registerService())
  .then(serviceInfo => {
    let logEntry = `Starting ${config.hydra.serviceName} (v.${config.version})`;
    hydra.sendToHealthLog('info', logEntry);
    console.log(serviceInfo);

    Game.init(hydra);
    hydra.on('message', (message) => Game.messageHandler(message));
  })
  .catch(err => {
    console.log('Error initializing hydra', err);
  });
