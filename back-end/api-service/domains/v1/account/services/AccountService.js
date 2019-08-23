class AccountService {
  constructor(repository) {
    super();
    this.repository = repository;
  }

  register(...args) {
    return this.repository.register(...args);
  }

}
module.exports = AccountService;
