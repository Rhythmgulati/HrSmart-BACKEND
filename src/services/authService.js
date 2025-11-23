import jwt from "jsonwebtoken";

const generateTokenService = async (payload, secret, options) => {
    return jwt.sign(payload, secret, options);
};





export { generateTokenService };