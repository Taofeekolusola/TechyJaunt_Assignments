const bcrypt = require('bcrypt')
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// @desc create user API
// @route POST /user
// @access public

const createUserHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //check if name is a string
        if (typeof name !== 'string') {
            return res.status(400).json({ message: 'Invalid datatype, name must be a string' });
        }
        //check if email is a string
        if (typeof email !== 'string') {
            return res.status(400).json({ message: 'Invalid datatype, email must be a string' });
        }
        //check if password is a string
        if (typeof password !== 'string') {
            return res.status(400).json({ message: 'Invalid datatype, password must be a string' });
        }
        //check the password length
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ 
            id: user.id,
            name: user.name,
            email: user.email
        });
        return;
    
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

// @desc Retrieves user API
// @route GET /user
// @access public

const getUserHandler = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if id is a string
        if (typeof id !== 'string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, id must be a string'
            });
        }

        // Find the user by ID
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ 
                message: 'User not found'
            });
        }

        // Respond with user data
        return res.status(200).json({ 
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });

    } catch (error) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
};

const loginUserHandler = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ where: {email}})
    if (!user) {
        return res.status(401).json({ 
            message: 'Invalid email or password' 
        });    
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).json({ 
            message: 'Invalid email or password'
        });
    }
    const payload = {
        id: user.id,
        email: user.email,
    }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '20d'}) 
    res.status(201).json({ 
        token 
    })
}

module.exports = {
    createUserHandler,
    getUserHandler,
    loginUserHandler
}