const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();

const {
    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,
  } = require('../controllers/orderController');

  const validateOrder = [
    body('customerName').isString().notEmpty().withMessage('Customer name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('mobileNumber').isMobilePhone().withMessage('Valid mobile number is required'),
    body('status').isString().withMessage('status is required'),
    body('totalAmount').isFloat({ gt: 0 }).withMessage('Total amount must be greater than zero'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  const validateId = [
    param('id').isInt().withMessage('ID must be a valid integer'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  
  
  router.get('/getOrder', getAllOrders);
  router.post('/createOrder', validateOrder, createOrder);
  router.put('/:id', validateId.concat(validateOrder), updateOrder);
  router.delete('/:id', validateId, deleteOrder);
  
module.exports = router;