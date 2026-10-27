class BusinessError extends Error {
  constructor(message) {
    super(message);
    this.name = "BusinessError";
    this.statusCode = 400;
  }
}
module.exports = BusinessError;
