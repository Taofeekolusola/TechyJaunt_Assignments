const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

const validateToken = (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token || token === "") {
            return res.status(401).json({ message: 'Token is required' });
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
            if (err) {
                console.error(err.message);
                return res.status(403).json({ message: 'Invalid token' });
            }
        const user = await User.findOne({where: {id: payload.id}});

        if(!user) {
            return res.status(403).json({ message: 'User not found' });
        }

            req.user = user;
            next();
        }
    )};

module.exports = {validateToken};