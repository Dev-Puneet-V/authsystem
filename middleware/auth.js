const jwt = require('jsonwebtoken');

// model is optional

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '') || 
    req.cookies.token ||
    req.body.token;

    if (!token) {
        res.status(403).send('Token in missing');
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
    } catch (error) {
        console.log(error)
        res.status(401).send('Invalid token');
    }
    next();
}

module.exports = auth;