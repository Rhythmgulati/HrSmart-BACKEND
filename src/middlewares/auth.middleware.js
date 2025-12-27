import { asyncHandler } from "../services/asyncHandler.js";
import ApiResponse from "../services/responseHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const verifyJwt = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "").trim();
  console.log("toke",token);
  
    if (!token) {   
    return ApiResponse.error(res, "Unauthorized", 401);
    }
    try {
    console.log("tryblock");

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    

    const user = await User.findById(decodedToken?.id);
    console.log(user);
    
    if (!user) {
    return ApiResponse.error(res, "Unauthorized", 401);

    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
     return ApiResponse.error(res, "Token Expired", 401);
    } else {
     return ApiResponse.error(res, "Invalid Access Token", 401);   }
    }
});

export { verifyJwt };