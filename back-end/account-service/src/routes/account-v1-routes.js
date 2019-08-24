/**
 * @name account-v1-api
 * @description This module packages the Api API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const jwtAuth = require('fwsp-jwt-auth');
const ServerResponse = require('fwsp-server-response');
const responses = require('../utils/responses');
const errors = require('../utils/errors');

let serverResponse = new ServerResponse();
express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

let api = express.Router();

api.post('/register', (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  if (!email || !password || !confirmPassword) {
    const { defaultType } = errors;
    return res.status(defaultType.badRequest.statusCode)
      .send(defaultType.badRequest);
  }
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    const { account } = errors;
    return res.status(account.invalidEmail.statusCode)
      .send(account.invalidEmail);
  }
  if (password !== confirmPassword) {
    const { account } = errors;
    return res.status(account.passwordNotMatch.statusCode)
      .send(account.passwordNotMatch);
  }

  const { account } = responses;
  return res.status(account.register.statusCode)
    .send(account.register);
});

module.exports = api;
