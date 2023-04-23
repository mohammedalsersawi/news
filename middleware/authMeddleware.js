const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({"status":false,data:"A token is required for authentication"});
    }
    try {
        const decoded = jwt.verify(token, "mohamed2562289mbn");
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({"status":false,data:"Invalid Token"});
    }
    return next();
};

module.exports = verifyToken;