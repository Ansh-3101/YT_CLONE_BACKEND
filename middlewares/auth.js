const { verify } = require("jsonwebtoken");
const User = require('../models/User');
const userAuth = async (req, res, next) => {
    const token = req.cookies.JWT_TOKEN || req.headers.authorization;
    if (token) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET);
            const email = decoded.email;

            if (email) {
                req.user = await User.findOne({ where: { email } });
                next();
            } else {
                return res.status(401).json({
                    status: "error",
                    error: "Invalid token",
                });
            }
        } catch (error) {
            return res.status(401).json({
                status: "error",
                error: "Invalid token",
            });
        }
    } else {
        return res.status(401).json({
            status: "error",
            error: "Not authorized",
        });
    }
};


module.exports = userAuth;