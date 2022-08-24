const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {

        console.log("whyyyyyyyyyyyyy  1");
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decodedToken = jwt.verify(token, 'rbircrihruihruidrnhr');
        console.log(decodedToken);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
        console.log("whyyyyyyyyyyyyy  2");
    }
};
