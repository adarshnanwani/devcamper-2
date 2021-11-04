export default class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message)
    // Create a custom property for this class
    this.statusCode = statusCode
  }
}
