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
const crypto = require('crypto');

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
  const hashedPassword = await crypto.createHmac('sha256', process.env.HASH_SECRET)
    .update(password)
    .digest('hex');
  const transaction = await Database.sequelize.transaction();
  try {
    await Database.accounts.create({
      email,
      password: hashedPassword,
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

  let userAccount = await Database.accounts.findOne({ raw: true, where: { email }});
  if (!userAccount) {
    const { account } = errors;
    return res.status(account.notExist.statusCode)
      .send(account.notExist);
  }
  const hashedPassword = await crypto.createHmac('sha256', process.env.HASH_SECRET)
    .update(password)
    .digest('hex');
  if (hashedPassword !== userAccount.password) {
    const { account } = errors;
    return res.status(account.notExist.statusCode)
      .send(account.notExist);
  }

  const nonce = crypto.randomBytes(12);
  const fingerPrint = crypto.randomBytes(Math.ceil(128/2)).toString('hex').slice(0, 128);
  const cipher = crypto.createCipher('aes-256-cbc', process.env.FP_HASH_SECRET, nonce);
  const hashedFingerPrint = cipher.update(fingerPrint, 'utf8', 'hex') + cipher.final('hex');

  // TODO: add when validating fingerprint from cookie & token
  // const decipher = crypto.createDecipher('aes-256-cbc', process.env.FP_HASH_SECRET, nonce);
  // const fp = decipher.update(hashedFingerPrint, 'hex', 'utf8') + decipher.final('utf8');

  // TODO: add update user isLoggedIn state to true

  const token = await jwtAuth.createToken({
    userId: userAccount.id,
    isAdmin: userAccount.isAdmin,
    hashedFingerPrint,
  });

  delete userAccount.password;
  return res.status(200)
    .cookie(
      process.env.NODE_ENV.includes('production')
        ? '__Secure-idle-session'
        : 'idle-session'
      , fingerPrint,
      {
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV.includes('production'),
        path: '/',
        domain: process.env.NODE_ENV.includes('production')
          ? process.env.HOST
          : 'localhost',
      }
    )
    .cookie(
      process.env.NODE_ENV.includes('production')
        ? '__Secure-session-nonce'
        : 'session-nonce'
      , nonce,
      {
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV.includes('production'),
        path: '/',
        domain: process.env.NODE_ENV.includes('production')
          ? process.env.HOST
          : 'localhost',
      }
    )
    .cookie('token', token, {
      sameSite: true,
      secure: process.env.NODE_ENV.includes('production'),
      path: '/',
      domain: process.env.NODE_ENV.includes('production')
        ? process.env.HOST
        : 'localhost',
    })
    .send({ status: 'OK', message: 'Logged In', account: userAccount });
});
module.exports = api;
