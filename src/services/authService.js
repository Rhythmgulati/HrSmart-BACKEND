import jwt from "jsonwebtoken";

const generateTokenService = async (payload, options) => {
    
    return jwt.sign(payload,process.env.JWT_SECRET, options);
};





export { generateTokenService };