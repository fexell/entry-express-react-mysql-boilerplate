// To return an error response
export const ErrorResponse = (status, error, message, data, res) => {
  return res.status(status).json({
    error: error,
    message: message,
    data: data
  })
}

// To return a success response
export const SuccessResponse = (status, success, message, data, res) => {
  return res.status(status).json({
    success: success,
    message: message,
    data: data
  })
}