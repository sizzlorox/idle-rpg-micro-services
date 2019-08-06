/**
* @name User
* @summary User Hydra service entry point
* @description User stuff
*/
'use strict';

const version = require('./package.json').version;
const hydra = require('hydra');
const jwtAuth = require('fwsp-jwt-auth');let config = require('fwsp-config');

const HydraLogger = require('fwsp-logger').HydraLogger;
hydra.use(new HydraLogger());

/**
* Load configuration file
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    config.hydra.serviceVersion = version;
    return jwtAuth.loadCerts(null, config.jwtPublicCert);
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
    console.log(logEntry);
  })
  .catch(err => {
    console.log('Error initializing hydra', err);
  });
