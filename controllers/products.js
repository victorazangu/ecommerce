import mongoose from 'mongoose';
import Category from '../models/category.js';
import Product from '../models/product.js';

const createProduct = async (req, res) => {
    const valid_cat_id = mongoose.Types.ObjectId.isValid(req.body.category);
    if (!valid_cat_id) {
        res.status(400).json({ message: 'Invalid category' });
    } else {
        const category = await Category.findById(req.body.category);
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            const product = await Product.create({ ...req.body });
            if (product) {
                res.status(201).json(product);
            } else {
                res.status(500).json({ message: 'Error creating product' });
            }
        }
    }
};
const getAllProducts = async (req, res) => {
    const products = await Product.find().populate('category');
    if (products) {
        res.status(200).json(products);
    } else {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

const getProductById = async (req, res) => {
    const valid_product_id = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!valid_product_id) {
        res.status(400).json({ massage: 'Invalid product Id' });
    }
    await Product.findById(req.params.id)
        .populate('category')
        .then((product) => {
            if (product) {
                res.status(200).json({ message: 'success', data: product });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        })
        .catch((e) => {
            res.status(500).json({
                message: 'Error fetching product',
                error: e.message,
            });
        });
};
const updateProduct = async (req, res) => {
    const valid_product_id = mongoose.Types.ObjectId.isValid(req.params.id);
    const valid_cat_id = mongoose.isValidObjectId(req.body.category);
    if (!valid_product_id) {
        res.status(400).json({ massage: 'Invalid product Id' });
    }
    if (!valid_cat_id) {
        res.status(400).json({ massage: 'Invalid category Id' });
    }
    await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
    )
        .populate('category')
        .then((product) => {
            if (product) {
                res.status(200).json({
                    message: 'product updated',
                    data: product,
                });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        })
        .catch((e) => {
            res.status(500).json({
                message: 'Error updating product',
                error: e.message,
            });
        });
};

const deleteProduct = async (req, res) => {
    const valid_product_id = mongoose.Types.ObjectId.isValid(req.params.id);
    const valid_cat_id = mongoose.Types.ObjectId.isValid(req.body.category);
    if (!valid_product_id) {
        res.status(400).json({ massage: 'Invalid product Id' });
    }
    if (!valid_cat_id) {
        res.status(400).json({ message: 'Invalid Category id' });
    }

    await Product.findByIdAndDelete(req.params.id)
        .then((product) => {
            if (product) {
                res.status(204).json({ message: 'success' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        })
        .catch((e) => {
            res.status(500).json({
                message: 'Error deleting product',
                error: e.message,
            });
        });
};

const countProducts =async (req,res)=>{
const p_count = await Product.countDocuments()
if(!p_count){
    res.status(500).json({"message":"no products count"})
}
res.status(200).json({count:p_count})
}

const featuredProducts = async (req, res) => {
    try {     
        const count = req.params.count ? req.params.count : 0;
        const featured = await Product.find({ isFeatured: true }).populate('category').limit(+count);

        if (!featured || featured.length === 0) {
            return res.status(404).json({ message: 'No featured products found' });
        }

        res.status(200).json({ message: 'Success', data: featured });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' ,error:error.message});
    }
};



export {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    countProducts,
    featuredProducts
};
