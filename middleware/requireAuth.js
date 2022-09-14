const jwt = require('jsonwebtoken');


/*module.exports = (req, res, next) => {
    //console.log('otken ou pas ? ' + req.headers.authorization.split(' ')[1]);
    console.log('otken ou pas ? ' + req);
    const token = 'lalalalllllllllllllaallalalallalalalaallaalaa';
    console.log('otken ou pas ? ' + token);
    if (token) {
        console.log('alllez la ? ' + token);
        jwt.verify(token, 'rbircrihruihruidrnhr', async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.send(200).json('no token');
            } else {
                console.log(decodedToken.userId);
                res.send(200).json(decodedToken.userId);
                next();
            }
        });
    } else {
        console.log('No token');
    }
};*/


module.exports = (req, res, next) => {
    const token = req.body.token;
    if (token) {
        jwt.verify(token, 'rbircrihruihruidrnhr', async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.status(200).json('no token(verify ne fonctionne pas)');
            } else {
                console.log(decodedToken.userId);
                res.status(200).json(decodedToken.userId);
                next();
            }
        });
    } else {
        console.log('No token(else)');
    }
};
