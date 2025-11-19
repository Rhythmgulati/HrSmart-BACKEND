class ApiResponse {
  static success(res, data, message = "Request successful") {
    return res.status(200).json({
      status: "success",
      message,
      data,
    });
  };
  static error(res, error, message = "An error occurred", statusCode = 500) {
    return res.status(statusCode).json({
      status: "error",
      message,
      error: error.toString(),
    });
  };
}

export default ApiResponse;