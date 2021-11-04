export default function errorHandler(err, eq, res, next) {
  // Log to console for dev
  console.log(err.stack.red)

  res
    .status(err.statusCode || 500)
    .json({ success: false, error: err.message || 'Server Error' })
}
