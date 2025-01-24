const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido.' });
        }

        req.user = user;
        next();
    });
}

module.exports = authenticateToken;