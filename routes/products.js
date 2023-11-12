import express from 'express';
import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/products.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
