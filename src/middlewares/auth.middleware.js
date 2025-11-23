import ApiResponse from "../services/responseHandler";

const verifyJwt = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "").trim();
    if (!token) {   
    throw new ApiResponse.error(401, "Unauthorized Request!");
    }
    try {
    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });

    const user = await getUser(decodedToken?.userId);
    if (!user) {
        throw new ApiResponse.error(401, "Invalid Access Token!");
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(new ApiResponse.error(401, "Token Expired"));
    } else {
      next(new ApiResponse.error(401, "Invalid Access Token"));
    }
    }
});

export { verifyJwt };