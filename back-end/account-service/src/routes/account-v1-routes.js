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
const Database = require('../sequelizer/Database').db;
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

let serverResponse = new ServerResponse();
express.response.sendError = function(err) {
  serverResponse.sendServerError(this, {result: {error: err}});
};
express.response.sendOk = function(result) {
  serverResponse.sendOk(this, {result});
};

let api = express.Router();

api.post('/register', async (req, res, next) => {
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

  const accountWithEmail = await Database.accounts.findOne({ where: { email }});
  if (accountWithEmail) {
    const { account } = errors;
    return res.status(account.alreadyExists.statusCode)
      .send(account.alreadyExists);
  }

  const { account } = responses;
  const transaction = await Database.sequelize.transaction();
  try {
    await Database.accounts.create({
      email,
      password: await bcrypt.hash(password, 10),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, { transaction });
    await transaction.commit();
    return res.status(account.register.statusCode)
      .send(account.register);
  } catch(err) {
    console.log(err);
    await transaction.rollback();
    const { account } = errors;
    return res.status(account.createFailed.statusCode)
      .send(account.createFailed);
  }
});

api.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const { defaultType } = errors;
    return res.status(defaultType.badRequest.statusCode)
      .send(defaultType.badRequest);
  }
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    const { account } = errors;
    return res.status(account.invalidEmail.statusCode)
      .send(account.invalidEmail);
  }

  const userAccount = await Database.accounts.findOne({ where: { email }});
  if (!userAccount) {
    const { account } = errors;
    return res.status(account.notExist.statusCode)
      .send(account.notExist);
  }
  const passwordMatched = await bcrypt.compare(password, userAccount.password);
  if (!passwordMatched) {
    const { account } = errors;
    return res.status(account.notExist.statusCode)
      .send(account.notExist);
  }

  const fingerPrint = await uuid();
  const token = await jwtAuth.createToken({
    userId: userAccount.id,
    isAdmin: userAccount.isAdmin,
    fingerPrint,
  });

  delete userAccount.password;
  return res.status(200)
    .cookie('idle-session', fingerPrint, {
      httpOnly: true,
      secure: true,
      path: '/',
      domain: process.env.NODE_ENV.includes('production')
        ? process.env.HOST
        : 'localhost',
    })
    .cookie('userId', userAccount.id, {
      secure: true,
      path: '/',
      domain: process.env.NODE_ENV.includes('production')
        ? process.env.HOST
        : 'localhost',
    })
    .send({ status: 'OK', message: 'Logged In', account: userAccount, token });
});
module.exports = api;
