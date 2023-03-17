const Product = require('../models/product');

const getProducts = (req, res) => {
    Product.find()
    .then((products) => {
    res.json(products);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error getting products' });
    });
};

const getProductById = (req, res) => {
const { id } = req.params;

Product.findById(id)
    .then((product) => {
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error getting product' });
    });
};

const createProduct = (req, res) => {
    const {
        name,
        starting_price,
        description,
        region,
        course,
        hours,
        training_vehicle,
        image,
    } = req.body;
    console.log("Request Body: ",req.body);
    const product = new Product({
        name,
        starting_price,
        description,
        region,
        course,
        hours,
        training_vehicle,
        image,
    });

product.save()
    .then((savedProduct) => {
        console.log('Product saved to database:', savedProduct);
        res.status(201).json(savedProduct);
    })
    .catch((err) => {
        console.error('Error saving product to database:', err);
        res.status(500).json({ error: 'Error creating product' });
    });
};

const updateProduct = (req, res) => {
const { id } = req.params;
const update = req.body;

Product.findByIdAndUpdate(id, update, { new: true })
    .then((updatedProduct) => {
    res.json(updatedProduct);
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error updating product' });
    });
};

const deleteProduct = (req, res) => {
const { id } = req.params;

Product.findByIdAndDelete(id)
    .then(() => {
    res.json({ success: true });
    })
    .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error deleting product' });
    });
};

module.exports = {
getProducts,
getProductById,
createProduct,
updateProduct,
deleteProduct,
};