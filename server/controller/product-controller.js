import mongoose from 'mongoose';
import Product from '../model/product-schema.js';
import { faker } from '@faker-js/faker';


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
        const { title, description, price } = request.body;

        
        const id = new mongoose.Types.ObjectId().toHexString();

        // Use faker for other fields
        const fakeTitle = faker.commerce.productName();
        const fakeDescription = faker.lorem.sentence();
        const fakePrice = faker.commerce.price();

        const newProduct = new Product({
            id,
            title: title || fakeTitle,
            description: description || fakeDescription,
            price: price || parseFloat(fakePrice)
            // Add other properties as needed
        });

        const savedProduct = await newProduct.save();
        response.status(201).json(savedProduct);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}
