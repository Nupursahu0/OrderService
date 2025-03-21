const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();


const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = require('../controllers/productController');

  const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
  
  // Validation for product body
  const productValidation = [
    body('name').isString().notEmpty().withMessage('Product name is required'),
    body('description').isString().optional().withMessage('Description must be a string'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    handleValidationErrors,
  ];
  
  // Validation for route ID param
  const idValidation = [
    param('id').isInt({ min: 1 }).withMessage('ID must be a valid positive integer'),
    handleValidationErrors,
  ];
  
  router.get('/productList', getAllProducts);
  router.post('/createProduct', productValidation, createProduct);
  router.put('/:id', idValidation, productValidation, updateProduct);
  router.delete('/:id', idValidation, deleteProduct);

module.exports = router;
