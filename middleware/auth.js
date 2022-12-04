const jwt = require('jsonwebtoken');

// model is optional

const auth = (req, res, next) => {
    console.log(req.cookies)
    const token = 
    req.body.token ||
    req.cookies.token ||
    req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        res.status(403).send('Token in missing');
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (Date.now() >= decode.exp * 1000) {
            return false;
        }
        console.log(decode);
        req.user = decode;
        // bring info from db
    } catch (error) {
        console.log(error)
        res.status(401).send('Invalid token');
    }
    next();
}

module.exports = auth;