const defaultType = {
  badRequest: {
    status: 'ERROR',
    statusCode: 400,
  },
  unprocessableEntity: {
    status: 'ERROR',
    statusCode: 422,
  },
  internal: {
    status: 'ERROR',
    statusCode: 500,
  },
};

const errors = {
  defaultType,
  account: {
    invalidEmail: Object.assign({}, defaultType.badRequest, { message: 'Invalid Email' }),
    passwordNotMatch: Object.assign({}, defaultType.badRequest, { message: 'Password does not match' }),
    alreadyExists: Object.assign({}, defaultType.unprocessableEntity, { message: 'Email is invalid or already taken' }),
    createFailed: Object.assign({}, defaultType.internal, { message: 'Oh shit! Something went wrong' }),
  },
};
module.exports = errors;
