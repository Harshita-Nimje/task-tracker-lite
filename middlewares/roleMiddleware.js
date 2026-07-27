

const checkRole = (role) => {
    return (req, res, next) => {
        try {

            if (!req.user) {
                return res.status(401).json({
                    message: "Not authorized, no user",
                });
            }


            if (req.user.role !== role) {
                return res.status(403).json({
                    message: "Access denied: insufficient permissions",
                });
            }

            next();
        } catch (error) {
            console.error("Role Middleware Error:", error.message);

            return res.status(500).json({
                message: "Server error in role check",
            });
        }
    };
};

export default checkRole;