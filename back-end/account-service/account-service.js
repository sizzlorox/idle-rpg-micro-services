/**
* @name Account
* @summary Account Hydra Express service entry point
* @description Manages Accounts
*/
'use strict';

const version = require('./package.json').version;
const hydraExpress = require('hydra-express');

const jwtAuth = require('fwsp-jwt-auth');
const HydraExpressLogger = require('fwsp-logger').HydraExpressLogger;
hydraExpress.use(new HydraExpressLogger());

let config = require('fwsp-config');

/**
* Load configuration file and initialize hydraExpress app
*/
config.init('./config/config.json')
  .then(() => {
    config.version = version;
    // Used fwsp-jwt-auths keygen.sh to make the private cert and public cert
    return jwtAuth.loadCerts(config.jwtPrivateCert, config.jwtPublicCert);
  })
  .then(status => hydraExpress.init(config.getObject(), version, () => {
    hydraExpress.registerRoutes({
      '/v1/account': require('./src/routes/account-v1-routes')
    });
  }))
  .then(serviceInfo => console.log('serviceInfo', serviceInfo))
  .catch(err => console.log('err', err));
