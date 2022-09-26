const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.body.token;
    console.log(process.env.KEY_JWT);
    if (token) {
        jwt.verify(token, process.env.KEY_JWT, async (err, decodedToken) => {
            if (err) {
                res.status(200).json(err);
            } else {
                res.status(200).json(decodedToken.userId);
                next();
            }
        });
    } else {
        console.log("No token");
    }
};
