const express = require('express');
const bcrypt = require('bcryptjs');
const users = [];
const dotenv = require('dotenv');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

dotenv.config();

// @desc POST a user
// @route POST'/users/:id'
// @access public
const createUserHandler = async (req, res) => {
    try {
        const { name, gender, age, email, password} = req.body;
        const lowerCaseGender = gender.toLowerCase();

        if (typeof name !== 'string') {
            return res.status(400).json({ message: 'Invalid name, name must be a string' });
        }

        if (typeof gender !== 'string') {
            return res.status(400).json({ message: 'Invalid gender, gender must be a string' });
        }

        if (typeof email !== 'string') {
            return res.status(400).json({ message: 'Invalid email, email must be a string' });
        } else if (!email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email format, email must contain @' });
        }

        if (lowerCaseGender !== 'male' && lowerCaseGender !== 'female') {
            return res.status(400).json({ message: 'Gender must be either male or female' });
        }

        if (typeof age !== 'number') {
            return res.status(400).json({ message: 'Age must be a number' });
        } else if (age < 18) {
            return res.status(400).json({ message: 'User must be at least 18 years old' });
        }

        if (typeof password!== 'string') {
            return res.status(400).json({ message: 'Invalid password, password must be a string' });
        } else if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = User.build({ name, gender: lowerCaseGender, age, email });
        await user.save();
        res.status(201).json(user);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc GET a user
// @route GET'/users'
// @access public
const getUsersHandler = async (req, res) => {
    try {
        const users = await User.findAll({});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc GET a user
// @route GETS '/users/:id'
// @access public
const getUserHandler = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID, user ID must be a number' });
        }

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc PUT a user
// @route PUT'/users/:id'
// @access public
const updateUserHandler = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId) || typeof userId !== 'number') {
            return res.status(400).json({ message: 'Invalid user ID, user ID must be a number' });
        }

        const {name, age, email, gender, password} = req.body;
        const lowerCaseGender = gender.toLowerCase();

        if(typeof name !== 'string') {
            return res.status(400).json({ message: 'Invalid name, name must be a string' });
        }

        if (typeof lowerCaseGender !== 'string') {
            return res.status(400).json({ message: 'Invalid gender, gender must be a string' });
        } else if (lowerCaseGender !== 'male' && lowerCaseGender !== 'female') {
            return res.status(400).json({ message: 'Gender must be either male or female' });
        }

        if (typeof email!== 'string') {
            return res.status(400).json({ message: 'Invalid email, email must be a string' });
        } else if (!email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email format, email must contain @' });
        }

        if (typeof age!== 'number') {
            return res.status(400).json({ message: 'Age must be a number' });
        } else if (age < 18) {
            return res.status(400).json({ message: 'User must be at least 18 years old' });
        }

        if (typeof password !== 'string') {
            return res.status(400).json({ message: 'Invalid password, password must be a string' });
        } else if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.gender = lowerCaseGender;
        user.age = age;
        user.email = email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Delete a user
// @route Delete'/users/:id'
// @access public
const deleteUserHandler = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (isNaN(userId) || typeof userId !== 'number') {
            return res.status(400).json({ message: 'Invalid user ID, user ID must be a number' });
        }

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(204).json("User deleted successfully");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc LOGs a user in
// @route POST'/users/:id'
// @access public
const loginUserHandler = async (req, res) => {
        const {email, password} = req.body;
        const secret_token = process.env.JWT_SECRET_KEY
        const user = await User.findOne({ where: { email: email }})
        if (!user) {
            res.status(401).json({ message: 'Invalid email' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }

        const payload = {
            userId: user.id,
            email: user.email,
        }

        const access_token = jwt.sign(payload, secret_token, { expiresIn: '1h'})
        const refresh_token = jwt.sign(payload, secret_token, { expiresIn: '7days' })
        res.status(200).json({ access_token, refresh_token });

       // const token = jwt.sign({ userId: user.id }, secret_token, { expiresIn: '1h' });
       // res.json({ token });
       //res.json(user);
}

module.exports = {
    createUserHandler,
    getUsersHandler,
    updateUserHandler,
    deleteUserHandler,
    getUserHandler,
    loginUserHandler,
};