const { AppDataSource } = require('../config/db');
const Product = require('../models/product');

const productRepository = AppDataSource.getRepository(Product);

const getAllProducts = async (req, res) => {
  try {
    const products = await productRepository.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productRepository.save(req.body);
    res.status(201).json({message:`product created successfully`,product});
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const existingProduct = await productRepository.findOne({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await productRepository.update(id, req.body);
    res.json({ message: 'Product updated' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const existingProduct = await productRepository.findOne({ where: { id } });
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await productRepository.delete(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
