import mongoose from 'mongoose';
import Product from '../model/product-schema.js';


export const getProducts = async (request, response) => {
    try {
        const products = await Product.find({});
        response.status(200).json(products);
    }catch (error) {
        response.status(401).json({message:error.message});
    }
}

export const getProductById = async (request, response) => {
    try {
        const products = await Product.findOne({ 'id': request.params.id });
        response.status(200).json(products);
    }catch (error) {
        response.status(401).json({message:error.message});
    }
}

export const createProduct = async (request, response) => {
    try {
        const {id, title, description, price } = request.body;

        const newProduct = new Product({
            id: new mongoose.Types.ObjectId(),
            title,
            description,
            price,
            url,
            detailsUrl,
            quantity,
            discount,
            tagline
            // Add other properties as needed
        });

        const savedProduct = await newProduct.save();
        response.status(201).json(savedProduct);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}