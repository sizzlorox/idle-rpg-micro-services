const defaultType = {
  badRequest: {
    status: 'ERROR',
    statusCode: 400,
  },
};

const errors = {
  defaultType,
  account: {
    invalidEmail: Object.assign({}, defaultType.badRequest, { message: 'Invalid Email' }),
    passwordNotMatch: Object.assign({}, defaultType.badRequest, { message: 'Password does not match' }),
  },
};
module.exports = errors;
