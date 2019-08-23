/**
 * @name api-v1-api
 * @description This module packages the Api API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const jwtAuth = require('fwsp-jwt-auth');
const ServerResponse = require('fwsp-server-response');

let serverResponse = new ServerResponse();
express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

const { AccountController: Controller } = require('../controllers/AccountController');
const { AccountService: Service } = require('../services/AccountService');
const { AccountRepository: Repository } = require('../repositories/AccountRepository');

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

const domain = 'account';
let api = express.Router();

api.post(`/v1/${domain}/register`, (req, res, next) => controller.register(req, res, next));

module.exports = api;
