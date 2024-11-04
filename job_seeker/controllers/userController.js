const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

//@desc create user profile
//@route POST /users/profile
//@access public

const createUserProfile = async (req, res) => {
    try {
        const {username, id, email, password, role, profilePicture} = req.body;

        if (!username || typeof username !== 'string') {
            return res.status(400).json({
                msg: 'username is required and must be a string'
            });
        }
        if (!email || typeof email !== 'string') {
            return res.status(400).json({
                msg: 'Email is required and must be a string'
            });
        }

        if (!password || typeof password !== 'string') {
            return res.status(400).json({
                msg: 'Password is required and must be a string'
            });
        }

        if (!role || typeof role !== 'string') {
            return res.status(400).json({
                msg: 'Role is required and must be a string'
            });
        }
        if (typeof profilePicture !== 'string') {
            return res.status(400).json({
                msg: 'Profile picture must be a string'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role,
            profilePicture
        });

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            profilePicture: user.profilePicture
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server Error');
    }
}

//@desc Get user profile
//@route GET /users/profile/:id
//@access private

const getUserProfile = async (req, res) => { 
    try {
        const {id} = req.params;

        if (typeof id !== 'string') {
            return res.status(400).json({
                msg: 'Invalid user id, id must be a string'
            });
        }
        const user = await User.findByPk(id);

        if (!user)
            return res.status(404).json({
                msg: 'User not found'
            });

        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            profilePicture: user.profilePicture,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

//@desc updates user profile
//@route PUT /users/profile/:id
//@access private

const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params
        const { username, email, role, profilePicture } = req.body

        if (typeof id !== 'string') {
            return res.status(400).json({
                msg: 'invalid input, id must be a string'
            });
        }

        if (!username || typeof username !== 'string') {
            return res.status(400).json({
                msg: 'username is required and must be a string'
            });
        }
        if (!email || typeof email !== 'string') {
            return res.status(400).json({
                msg: 'Email is required and must be a string'
            });
        }


        if (!role || typeof role !== 'string') {
            return res.status(400).json({
                msg: 'Role is required and must be a string'
            });
        }
        if (typeof profilePicture !== 'string') {
            return res.status(400).json({
                msg: 'Profile picture must be a string'
            });
        }

        const user = await User.findByPk(id) 

        if (!user) {
            return res.status(400).json('user not found')
        }
        
        user.username = username;
        user.email = email;
        user.role = role;
        user.profilePicture = profilePicture;

        await user.save()
        res.status(201).json(user)
        
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

//@desc deletes user profile
//@route DELETE /users/profile/:id
//@access private

const deleteUserProfile = async (req, res) => { 
    try {
        const { id } = req.params

        if (typeof id!== 'string') {
            return res.status(400).json({
                msg: 'Invalid user id, id must be a string'
            });
        }

        const user = await User.findByPk(id) 

        if (!user) {
            return res.status(400).json('user not found')
        }

        await user.destroy()
        res.status(200).json('User deleted')
        
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

//@desc lpgin user profile
//@route GET /users/profile/:id
//@access private

const loginUserProfile = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ where: {email}})
    if (!user) {
        return res.status(401).json({ 
            message: 'Invalid email' 
        });    
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).json({ 
            message: 'Invalid password'
        });
    }
    const payload = {
        id: user.id,
        email: user.email,
    }
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '7d'}) 
    res.status(201).json({ 
        token 
    })
}

module.exports = {
    getUserProfile,
    createUserProfile,
    updateUserProfile,
    deleteUserProfile,
    loginUserProfile
}