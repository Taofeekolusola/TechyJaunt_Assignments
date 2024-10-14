const express = require('express')
const router = express.Router()
const {createCategoryHandler,
    getCategoriesHandler,
    getCategoryByIdHandler,
    updateCategoryByIdHandler,
    deleteCategoryByIdHandler
} = require('../controllers/categoryController')
const {validateToken} = require('../middlewares/auth')

router.get('/', getCategoriesHandler)
router.post('/', createCategoryHandler)
router.get('/:id', validateToken, getCategoryByIdHandler)
router.put('/:id', validateToken, updateCategoryByIdHandler)
router.delete('/:id', validateToken, deleteCategoryByIdHandler)

module.exports = router