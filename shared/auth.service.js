require('dotenv').config();
const jwt = require("jsonwebtoken");



const generateToken = payload => {
    const option = {
        expiresIn: process.env.JWT_TOKEN_EXPIRY,
        issuer: process.env.JWT_ISSUER
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, option);
    return token;
}

const validateToken = (req, res, next) => {
    const authToken = req.headers.authorization;
    const token = authToken.split(" ")[1];

    const option = {
        expiresIn: process.env.JWT_TOKEN_EXPIRY,
        issuer: process.env.JWT_ISSUER
    }

    try {
        result = jwt.verify(token, process.env.JWT_SECRET_KEY, option);
        res.locals.user = result;
        userId = result.id;
        userRole = result.role;
        next();
    } catch (e) {
        return res.status(401).json({ "error": "Invalid token or token expired" });
    }

}



module.exports = {
    generateToken,
    validateToken
}