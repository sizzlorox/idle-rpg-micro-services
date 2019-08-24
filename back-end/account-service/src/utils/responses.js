const defaultType = {
  success: {
    status: 'OK',
    statusCode: 200,
  },
  created: {
    status: 'OK',
    statusCode: 201,
  }
};

const responses = {
  defaultType,
  account: {
    register: Object.assign(defaultType.created, { message: 'Registration Successful' }),
  },
};
module.exports = responses;
