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
    return res.send(defaultType.badRequest.statusCode, defaultType.badRequest);
  }
  if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)) {
    const { account } = error;
    return res.send(account.invalidEmail.statusCode, account.invalidEmail);
  }
  if (password !== confirmPassword) {
    const { account } = error;
    return res.send(account.passwordNotMatch.statusCode, account.passwordNotMatch);
  }

  const { account } = responses;
  return res.send(account.register.statusCode, account.register);
});

module.exports = api;
