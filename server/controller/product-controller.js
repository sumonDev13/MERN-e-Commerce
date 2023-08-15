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
        const fakeImageUrl = faker.image.url();
        const fakeDate = faker.defaultRefDate()

        const newProduct = new Product({
            id:id,
            title: title || fakeTitle,
            description: description || fakeDescription,
            price: price || parseFloat(fakePrice),
            imageUrl: fakeImageUrl,
            createdAt:fakeDate
            // Add other properties as needed
        });

        const savedProduct = await newProduct.save();
        response.status(201).json(savedProduct);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}


export const updateProduct = async (request, response) => {
    try {
        const { title, description, price } = request.body;
        const productId = request.params.id;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                title,
                description,
                price
                // Update other properties as needed
            },
            { new: true } // Return the updated product
        );
       
        response.status(200).json(updatedProduct);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (request, response) => {
    try {
        const productId = request.params.id;

        // Find the product and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (deletedProduct) {
            response.status(200).json({ message: "Product deleted successfully" });
        } else {
            response.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
};
