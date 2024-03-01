const jwt = require("jsonwebtoken");


const generateUserToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: `${process.env.AUTH_EXPIRE_DAYS}d`,
    });
};

module.exports = { generateUserToken };
