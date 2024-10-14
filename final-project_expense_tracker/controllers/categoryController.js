const { UUID } = require('sequelize');
const Category = require('../models/Category');

// @desc creates a new Category
// @route POST /category
// @access private

const createCategoryHandler = async (req, res) => {
    try {
        const { name } = req.body;
        // Check if name is a string
        if (typeof name !== 'string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, name must be a string'
            });
        }
        // Check if a category with the same name already exists
        const existingCategory = await Category.findOne({ where: { name } });
        if (existingCategory) {
            return res.status(400).json({
                message: 'A category with the same name already exists'
            });
        }
        // Create a new category and send it back with a 201 status code
        const category = await Category.create({ name });
        res.status(201).json(category);

    } catch (error) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
}


// @desc gets all Categories
// @route GET /category
// @access public

const getCategoriesHandler = async (req, res) => {
    try {
        // Fetch all categories and send them back with a 200 status code
        const category = await Category.findAll();
        res.status(200).json(category);

    } catch (error) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
}


// @desc gets a single Category by ID
// @route GET /category/:id
// @access public

const getCategoryByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;

        if (typeof id !== 'string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, id must be a string'
            });
        }
        // Fetch a single category by ID and send it back with a 200 status code
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            });
        }
        res.status(200).json(category);

    } catch (error) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
}


// @desc updates a Category by ID
// @route POST /category/:id
// @access public

const updateCategoryByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        
        if (typeof name!=='string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, name must be a string'
            });
        }

        if (typeof id!== 'string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, id must be a string'
            });
        }
        // Fetch a single category by ID and update it with the new data
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            });
        }
        //update category
        category.name = name;
        await category.save();
        res.status(200).json(category);

        // const updatedCategory = await category.update(req.body);
        // res.status(200).json(updatedCategory)
    } catch (erroe) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
}

// @desc delete a Category by ID
// @route DELETE /category/:id
// @access public

const deleteCategoryByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;

        if (typeof id!== 'string') {
            return res.status(400).json({ 
                message: 'Invalid datatype, id must be a string'
            });
        }
        // Fetch a single category by ID and delete it
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found'
            });
        }
        await category.destroy();
        res.status(204).send();
    } catch (error) {
        // Send 500 status for server errors
        return res.status(500).json({
            message: error.message
        });
    }
}
module.exports = {
    createCategoryHandler,
    getCategoriesHandler,
    getCategoryByIdHandler,
    updateCategoryByIdHandler,
    deleteCategoryByIdHandler
};

