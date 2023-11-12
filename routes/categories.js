import express from 'express'
import {
    createCategory,
    getAllCategories,
    deleteCategory,
    getCategoryById,
    updateCategory,
} from '../controllers/categories.js'

const router = express.Router()

router.post('/', createCategory)
router.get('/', getAllCategories)
router.delete('/:id', deleteCategory)
router.get('/:id', getCategoryById)
router.put('/:id', updateCategory)

export default router
