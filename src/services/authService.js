import { asyncHandler } from "./asyncHandler";

const generateTokenService = asyncHandler(async (payload, secret, options) => {
    return jwt.sign(payload, secret, options);
});





export { generateTokenService };