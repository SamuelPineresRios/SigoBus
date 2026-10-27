class SystemError extends Error {
  constructor(message) {
    super(message);
    this.name = "SystemError";
    this.statusCode = 500;
  }
}
module.exports = SystemError;
