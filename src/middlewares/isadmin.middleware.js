const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return ApiResponse.error(res, "Access denied. Admins only.");
    }
};

export { isAdmin };