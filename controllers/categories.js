import Category from '../models/category.js';

const createCategory = async (req, res) => {
    const category = await Category.create({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    });
    if (category) {
        res.status(201).json(category);
    } else {
        res.status(500).json({ message: 'Error creating category' });
    }
};

const getAllCategories = async (req, res) => {
    const allCategories = await Category.find();
    if (allCategories) {
        res.status(200).json(allCategories);
    } else {
        res.status(500).json({ message: 'Error fetching' });
    }
};

const getCategoryById = async (req, res) => {
    await Category.findById(req.params.id)
        .then((category) => {
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ message: 'Catrgory was not found' });
            }
        })
        .catch((e) => {
            res.status(500).json({
                message: 'Error while finding category',
                error: e.message,
            });
        });
};

const updateCategory = (req, res) => {
    Category.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
        .then((category) => {
            if (category) {
                res.status(200).json({
                    success: true,
                    message: 'Category is updated',
                    data: category,
                });
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        })
        .catch((e) => {
            res.status(500).json({
                message: 'Error white updating category',
                error: e.message,
            });
        });
};

// const updateCategory = (req, res) => {
//     Category.findOneAndUpdate(
//         { _id: req.params.id },
//         { ...req.body },
//         { new: true }
//     )
//         .then((category) => {
//             if (category) {
//                 res.status(200).json({
//                     success: true,
//                     message: 'Category is updated',
//                     data: category,
//                 });
//             } else {
//                 res.status(404).json({ message: 'Category not found' });
//             }
//         })
//         .catch((e) => {
//             res.status(500).json({
//                 message: 'Error while updating category',
//                 error: e.message,
//             });
//         });
// };

const deleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
        .then((category) => {
            if (category) {
                res.status(204).json({
                    success: true,
                    message: 'Category is deleted',
                });
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        })
        .catch((e) => {
            res.status(500).json({
                message: 'Error deleting category',
                error: e.message,
            });
        });
};

export {
    createCategory,
    getAllCategories,
    deleteCategory,
    getCategoryById,
    updateCategory,
};
