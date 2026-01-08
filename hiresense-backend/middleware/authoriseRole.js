const authoriseRole = (...allowedRoles) => {
    return (req, res, next) => {
        // valdiateToken middleware should have run before this and set the user info
        if (!req.user || !req.user.roles) {
            return res.status(401).json({ message: "No roles assigned"});
        }
        const hasRole = allowedRoles.some(role => req.user.roles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ message: "Forbidden: You do not have the required role"});
        }
        next();
    };
};

module.exports = authoriseRole;