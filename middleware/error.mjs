import ErrorResponse from '../utils/errorResponse.mjs'

export default function errorHandler(err, eq, res, next) {
  let error = { ...err }

  // Log to console for dev
  console.log(err.stack.red)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' })
}