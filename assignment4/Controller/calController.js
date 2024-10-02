const express = require('express');

// @desc add two numbers
// @route POST /api/calculate/add
// @access public
const add = async (req, res) => {
    try {
        const {a, b} = req.body
        if (typeof a !== 'number' || typeof b !== 'number') {
            res.status(404).json('a and b must be a number')
            return
        }

        if (isNaN(a) || isNaN(b)) {
            res.status(404).json('a and b must be valid numbers')
        }
        const c = await parseInt(a + b)
        res.status(200).json(c)
    } catch (error) {
        res.status(500).json('message', error.message)
    }
}

// @desc subtract two numbers
// @route POST /api/calculate/subtract
// @access public
const subtract = async (req, res) => {
    try {
        const {a, b} = req.body
        if (typeof a !== 'number' || typeof b !== 'number') {
            res.status(404).json('a and b must be a number')
            return
        }

        if (isNaN(a) || isNaN(b)) {
            res.status(404).json('a and b must be valid numbers')
            return
        }

        if (b > a || a <= 0) {
            res.status(404).json('Please return only positive numbers')
            return
        }

        const c = await parseInt(a - b)
        res.status(200).json(c)
    } catch (error) {
        res.status(500).json('message', error.message)
    }
}

// @desc multiplies two numbers
// @route POST /api/calculate/multiply
// @access public
const multiply = async (req, res) => {
    try {
        const {a, b} = req.body
        if (typeof a !== 'number' || typeof b !== 'number') {
            res.status(404).json('a and b must be a number')
            return
        }

        if (isNaN(a) || isNaN(b)) {
            res.status(404).json('a and b must be valid numbers')
        }
        const c = await parseInt(a * b)
        res.status(200).json(c)
    } catch (error) {
        res.status(500).json('message', error.message)
    }
}

// @desc divides two numbers
// @route POST /api/calculate/divide
// @access public
const divide = async (req, res) => {
    try {
        const {a, b} = req.body
        if (typeof a !== 'number' || typeof b !== 'number') {
            res.status(404).json('a and b must be a number')
            return
        }

        if (isNaN(a) || isNaN(b)) {
            res.status(404).json('a and b must be valid numbers')
            return
        }

        if (b <= 0) {
            res.status(404).json('Can not devide by zero')
            return
        }

        const c = await parseInt(a / b)
        res.status(200).json(c)
    } catch (error) {
        res.status(500).json('message', error.message)
    }
}

module.exports = {add, subtract, multiply, divide}