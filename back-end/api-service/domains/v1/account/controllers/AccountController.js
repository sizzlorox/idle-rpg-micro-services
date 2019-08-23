class AccountController {
  constructor(service) {
    super();
    this.service = service;
  }

  register(req, res, next) {

    return this.service.register(data)
      .then(data => res.send(data.status, data))
      .then(() => next());
  }

}
module.exports = AccountController;
