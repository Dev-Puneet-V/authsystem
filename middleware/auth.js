const jwt = require('jsonwebtoken');

// model is optional

const auth = (req, res, next) => {
    const token = 
    req.body.token ||
    req.cookies.token ||
    req.header('Authorization').replace('Bearer ', '');
    
    console.log(token, req.header('Authorization'),req.cookies.token)
    if (!token) {
        return res.status(403).send('Token in missing');
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (Date.now() >= decode.exp * 1000) {
            return res.status(401).send('Token expired');
        }
        req.user = decode;
        // bring info from db
    } catch (error) {
        return res.status(401).send(error.message);
    }
    return next();
}

module.exports = auth;