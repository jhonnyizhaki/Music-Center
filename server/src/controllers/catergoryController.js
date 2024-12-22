import Category from "../models/categoryModel.js"

export const createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        if (error.name == "ValidationError") {
            return res.status(422).json({ message: error._message, error: error.message });
        }
        console.error(error);
        res.status(500).json({ message: 'Failed to create category', error });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch categories', error });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch category', error });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.updateOne({ _id: req.params.id }, req.body);
        if (updatedCategory.modifiedCount == 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update category', error });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete category', error });
    }
};
