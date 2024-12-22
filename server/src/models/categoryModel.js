import mongoose from 'mongoose'

// Define the category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

export default Category
