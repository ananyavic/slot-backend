const jwt = require('jsonwebtoken');

function protect(req, res, next) {
    // Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify token using secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Add decoded data (userId) to request object
        next();  // Proceed to next middleware or route handler
    } catch (ex) {
        res.status(400).send({ error: 'Invalid token.' });
    }
}

module.exports = { protect };
